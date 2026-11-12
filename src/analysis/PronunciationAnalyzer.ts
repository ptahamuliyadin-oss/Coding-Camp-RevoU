// PronunciationAnalyzer: Analisis kesalahan pengucapan untuk Lapisan Analisis.
// Sumber: PronunciationAnalyzer pada design.md (requirements 4.1, 4.2, 4.3, 4.4, 4.5)

import { roundHalfUp } from './RoundUtils';
import type { PronunciationAnalysis, PronunciationError } from '../types';

/**
 * Menganalisis kesalahan pengucapan dengan membandingkan kata yang diucapkan
 * terhadap kata yang diharapkan secara posisi-demi-posisi (Req 4.1).
 *
 * Untuk setiap posisi `i` dalam rentang tumpang-tindih kedua array, kata
 * `spokenWords[i]` dibandingkan dengan `expectedWords[i]` secara
 * case-insensitive (Req 4.2). Jika berbeda, pasangan dimasukkan ke daftar
 * kesalahan (Req 4.3). Jika panjang kedua array berbeda, kata tanpa pasangan
 * ditandai sebagai kesalahan dengan `expectedWord` atau `spokenWord` bernilai
 * `null` (Req 4.5). Akurasi dihitung sebagai persentase kata benar terhadap
 * jumlah seluruh kata diharapkan, dibulatkan setengah ke atas (Req 4.4).
 *
 * Catatan: kata yang masuk ke fungsi ini diasumsikan telah dinormalisasi
 * (huruf kecil, tanpa tanda baca) oleh `splitWords` pada WordUtils. Namun,
 * perbandingan tetap dilakukan secara case-insensitive untuk memenuhi
 * Requirement 4.2 dan menjaga kebenaran terhadap masukan apa pun.
 *
 * @param spokenWords - Array kata yang diucapkan (Kata_Diucapkan).
 * @param expectedWords - Array kata yang diharapkan dari Teks_Bacaan (Kata_Diharapkan).
 * @returns Hasil analisis pengucapan berisi daftar kesalahan, akurasi,
 *          jumlah kata benar, dan jumlah seluruh kata diharapkan.
 *
 * @example
 * analyzePronunciation(['halo', 'dunia'], ['halo', 'dunia']);
 * // { errors: [], accuracy: 100, correctCount: 2, totalCount: 2 }
 *
 * analyzePronunciation(['halo', 'dono'], ['halo', 'dunia']);
 * // { errors: [{ position: 1, expectedWord: 'dunia', spokenWord: 'dono' }],
 * //   accuracy: 50, correctCount: 1, totalCount: 2 }
 *
 * analyzePronunciation(['halo', 'dunia', 'extra'], ['halo', 'dunia']);
 * // { errors: [{ position: 2, expectedWord: null, spokenWord: 'extra' }],
 * //   accuracy: 100, correctCount: 2, totalCount: 2 }
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5
 */
export function analyzePronunciation(
  spokenWords: string[],
  expectedWords: string[]
): PronunciationAnalysis {
  const errors: PronunciationError[] = [];
  let correctCount = 0;

  const spokenLength = spokenWords.length;
  const expectedLength = expectedWords.length;
  const overlap = Math.min(spokenLength, expectedLength);

  // Bandingkan setiap posisi pada rentang tumpang-tindih (Req 4.1, 4.2).
  for (let i = 0; i < overlap; i++) {
    const spoken = spokenWords[i];
    const expected = expectedWords[i];
    if (spoken.toLowerCase() === expected.toLowerCase()) {
      correctCount++;
    } else {
      // Ketidaksesuaian dimasukkan ke daftar kesalahan (Req 4.3).
      errors.push({
        position: i,
        expectedWord: expected,
        spokenWord: spoken,
      });
    }
  }

  // Kata tanpa pasangan akibat perbedaan panjang array ditandai sebagai
  // kesalahan dengan sisi yang hilang bernilai null (Req 4.5).
  if (spokenLength > expectedLength) {
    // Kata diucapkan berlebih: ada spokenWord tanpa expectedWord.
    for (let i = expectedLength; i < spokenLength; i++) {
      errors.push({
        position: i,
        expectedWord: null,
        spokenWord: spokenWords[i],
      });
    }
  } else if (expectedLength > spokenLength) {
    // Kata diucapkan kurang: ada expectedWord tanpa spokenWord.
    for (let i = spokenLength; i < expectedLength; i++) {
      errors.push({
        position: i,
        expectedWord: expectedWords[i],
        spokenWord: null,
      });
    }
  }

  // Akurasi = roundHalfUp(kata benar / jumlah kata diharapkan * 100) (Req 4.4).
  // Jika tidak ada kata diharapkan (kasus tepi), akurasi 0 untuk menghindari
  // pembagian dengan nol. Dalam praktik, expectedWords selalu berasal dari
  // Teks_Bacaan dengan minimum 50 kata sehingga kasus ini tidak terjadi.
  const totalCount = expectedLength;
  const accuracy =
    totalCount === 0 ? 0 : roundHalfUp((correctCount / totalCount) * 100);

  return {
    errors,
    accuracy,
    correctCount,
    totalCount,
  };
}
