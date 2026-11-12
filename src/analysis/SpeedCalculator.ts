// SpeedCalculator: Fungsi murni penghitung kecepatan membaca untuk Lapisan Analisis.
// Sumber: SpeedCalculator pada design.md (requirements 3.1, 3.2, 3.3)

import { roundHalfUp } from './RoundUtils'
import type { SpeedResult, SpeedError } from '../types'

/**
 * Menghitung kecepatan membaca dalam satuan Kata Per Menit (KPM).
 *
 * Kecepatan dibandingkan sebagai jumlah kata dalam Transkrip dibagi waktu
 * tempuh dalam menit (Req 3.1). Waktu tempuh diberikan dalam milidetik,
 * sehingga dikonversi ke menit dengan membagi 60.000. Hasil kemudian
 * dibulatkan ke bilangan bulat terdekat dengan nilai desimal 0,5 dibulatkan
 * ke atas melalui `roundHalfUp` (Req 3.2).
 *
 * Jika waktu tempuh bernilai nol, fungsi ini mengembalikan `SpeedError`
 * alih-alih melakukan pembagian dengan nol (Req 3.3). Pengecekan ini
 * dilakukan sebelum perhitungan apa pun, sehingga pembagian dengan nol
 * tidak pernah terjadi.
 *
 * @param wordCount - Jumlah kata dalam Transkrip.
 * @param durationMs - Waktu tempuh dalam milidetik.
 * @returns `SpeedResult` berisi KPM yang dibulatkan bila waktu tempuh valid,
 *          atau `SpeedError` bila waktu tempuh bernilai nol.
 *
 * @example
 * calculateKPM(100, 60000);  // { kpm: 100, wordCount: 100, durationMs: 60000 }
 * calculateKPM(200, 60000);  // { kpm: 200, wordCount: 200, durationMs: 60000 }
 * calculateKPM(1, 40000);    // { kpm: 2,  wordCount: 1,   durationMs: 40000 } (1,5 -> 2)
 * calculateKPM(100, 0);      // { type: 'invalid-duration', message: 'Waktu tempuh tidak valid' }
 *
 * Validates: Requirements 3.1, 3.2, 3.3
 */
export function calculateKPM(
  wordCount: number,
  durationMs: number,
): SpeedResult | SpeedError {
  // Req 3.3: waktu tempuh nol tidak valid. Periksa sebelum pembagian agar
  // tidak pernah melakukan pembagian dengan nol.
  if (durationMs === 0) {
    return {
      type: 'invalid-duration',
      message: 'Waktu tempuh tidak valid',
    }
  }

  // Req 3.1 & 3.2: KPM = jumlah kata / (waktu tempuh dalam menit),
  // dibulatkan setengah ke atas.
  const kpm = roundHalfUp(wordCount / (durationMs / 60000))

  return {
    kpm,
    wordCount,
    durationMs,
  }
}
