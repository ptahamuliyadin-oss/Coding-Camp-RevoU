// Model data dan tipe inti untuk Situs Tes Kecepatan Membaca.
// Sumber: Data Models pada design.md (requirements 1.1, 3.1, 4.1, 5.1, 6.1)

/** Tingkat kesulitan Teks_Bacaan (Req 1.1). */
export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sulit';

/**
 * Teks bacaan yang ditampilkan kepada Pengguna (Req 1.1, 1.2).
 */
export interface ReadingText {
  id: string;
  difficulty: DifficultyLevel;
  /** Paragraf teks lengkap. */
  content: string;
  /** Jumlah kata sebagai bilangan bulat (Req 1.2). */
  wordCount: number;
}

/**
 * Transkrip hasil pengenalan ucapan.
 */
export interface Transcript {
  /** Teks transkrip lengkap. */
  text: string;
  /** Array kata ternormalisasi dari transkrip. */
  words: string[];
}

/**
 * Hasil perhitungan kecepatan membaca (Req 3.1).
 */
export interface SpeedResult {
  /** Kata Per Menit (dibulatkan, Req 3.2). */
  kpm: number;
  /** Jumlah kata dalam Transkrip. */
  wordCount: number;
  /** Waktu tempuh dalam milidetik. */
  durationMs: number;
}

/**
 * Kesalahan waktu tempuh tidak valid (Req 3.3).
 */
export interface SpeedError {
  type: 'invalid-duration';
  /** "Waktu tempuh tidak valid". */
  message: string;
}

/**
 * Satu kesalahan pengucapan (Req 4.1, 4.3, 4.5).
 */
export interface PronunciationError {
  /** Posisi indeks dalam perbandingan kata. */
  position: number;
  /** Kata_Diharapkan (null jika tidak ada pasangan, Req 4.5). */
  expectedWord: string | null;
  /** Kata_Diucapkan (null jika tidak ada pasangan, Req 4.5). */
  spokenWord: string | null;
}

/**
 * Hasil analisis pengucapan (Req 4.1, 4.3, 4.4).
 */
export interface PronunciationAnalysis {
  /** Daftar kesalahan pengucapan (Req 4.3). */
  errors: PronunciationError[];
  /** Akurasi_Pengucapan dalam persentase (dibulatkan, Req 4.4). */
  accuracy: number;
  /** Jumlah kata benar. */
  correctCount: number;
  /** Jumlah seluruh Kata_Diharapkan. */
  totalCount: number;
}

/** Kategori kejelasan artikulasi berdasarkan ambang batas skor (Req 5.3). */
export type ArticulationCategory = 'Jelas' | 'Sedang' | 'Tidak Jelas';

/**
 * Hasil penilaian artikulasi (Req 5.1, 5.2, 5.3).
 */
export interface ArticulationResult {
  /** Skor_Artikulasi 0-100 (Req 5.2). */
  score: number;
  /** Kategori kejelasan (Req 5.3). */
  category: ArticulationCategory;
  /** Jumlah kata dikenali jelas. */
  clearWordCount: number;
  /** Jumlah seluruh kata dalam Transkrip. */
  totalWordCount: number;
}

/**
 * Kesalahan transkrip kosong untuk artikulasi (Req 5.4).
 */
export interface ArticulationError {
  type: 'empty-transcript';
  /** "Transkrip tidak memuat kata". */
  message: string;
}

/**
 * Hasil tes lengkap yang ditampilkan di Dashboard_Hasil (Req 6.1).
 */
export interface TestResult {
  speed: SpeedResult | SpeedError;
  pronunciation: PronunciationAnalysis;
  articulation: ArticulationResult | ArticulationError;
}

/**
 * Kesalahan dari layanan pengenalan ucapan (Req 2.1, 2.3).
 * Memetakan event error Web Speech API ke tipe yang terdefinisi.
 */
export type SpeechRecognitionError =
  | { type: 'permission-denied'; message: string }
  | { type: 'no-speech'; message: string }
  | { type: 'not-supported'; message: string }
  | { type: 'unknown'; message: string };
