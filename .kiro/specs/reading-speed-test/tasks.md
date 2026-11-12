# Implementation Plan: Situs Tes Kecepatan Membaca

## Overview

Implementasi fitur Situs Tes Kecepatan Membaca sebagai aplikasi web sisi-klien menggunakan TypeScript, React 18, dan Vite. Arsitektur terdiri dari tiga lapisan yang terpisah: Lapisan Analisis (fungsi murni yang dapat diuji dengan property-based testing), Lapisan Layanan (TextRepository dan SpeechRecognitionService yang membungkus Web Speech API), dan Lapisan UI (komponen React dengan CSS Modules).

Pendekatan implementasi diawali dengan fungsi murni pada Lapisan Analisis (RoundUtils, WordUtils, SpeedCalculator, PronunciationAnalyzer, ArticulationScorer) agar dapat diuji dengan property-based testing menggunakan fast-check tanpa bergantung pada DOM atau Web Speech API. Setelah lapisan analisis tervalidasi, dilanjutkan dengan Lapisan Layanan, kemudian komponen UI, dan diakhiri dengan perangkatan seluruh komponen dalam App. Seluruh pemrosesan terjadi di browser Pengguna tanpa server backend.

## Tasks

- [x] 1. Siapkan struktur proyek, tipe data, dan kerangka pengujian
  - [x] 1.1 Inisialisasi struktur proyek Vite + React + TypeScript
    - Buat struktur direktori `src/` dengan subdirektori untuk `components`, `services`, `analysis`, `types`, dan `styles`
    - Konfigurasikan Vite dan CSS Modules
    - _Requirements: N/A (infrastruktur)_
  - [x] 1.2 Definisikan model data dan tipe inti
    - Buat berkas tipe dengan `DifficultyLevel`, `ReadingText`, `Transcript`, `SpeedResult`, `SpeedError`, `PronunciationError`, `PronunciationAnalysis`, `ArticulationResult`, `ArticulationError`, `ArticulationCategory`, `TestResult`, dan `SpeechRecognitionError`
    - _Requirements: 1.1, 3.1, 4.1, 5.1, 6.1_
  - [x] 1.3 Konfigurasikan kerangka pengujian Vitest + fast-check
    - Pasang dependensi vitest dan fast-check
    - Konfigurasikan Vitest dengan lingkungan jsdom untuk pengujian komponen
    - Tetapkan minimum 100 iterasi untuk pengujian properti
    - _Requirements: N/A (infrastruktur)_

- [x] 2. Implementasikan fungsi utilitas analisis (RoundUtils, WordUtils)
  - [x] 2.1 Implementasikan RoundUtils (fungsi roundHalfUp)
    - Implementasikan `roundHalfUp(value: number): number` yang membulatkan ke bilangan bulat terdekat dengan nilai 0,5 dibulatkan ke atas
    - _Requirements: 3.2_
  - [ ]* 2.2 Tulis pengujian properti untuk RoundUtils
    - **Property 3: Pembulatan setengah ke atas**
    - **Validates: Requirements 3.2**
  - [x] 2.3 Implementasikan WordUtils (fungsi normalizeWord, splitWords)
    - Implementasikan `normalizeWord(word: string): string` — ubah huruf kecil, hapus tanda baca
    - Implementasikan `splitWords(text: string): string[]` — pecah teks menjadi array kata ternormalisasi
    - _Requirements: 4.2_
  - [ ]* 2.4 Tulis pengujian properti untuk normalisasi kata WordUtils
    - **Property 10: Normalisasi kata bersifat idempoten**
    - **Validates: Requirements 4.2**

- [ ] 3. Implementasikan SpeedCalculator
  - [ ] 3.1 Implementasikan fungsi calculateKPM
    - Implementasikan `calculateKPM(wordCount: number, durationMs: number): SpeedResult | SpeedError`
    - Kembalikan `SpeedError` ketika `durationMs === 0` tanpa melakukan pembagian dengan nol
    - Hitung `kpm = roundHalfUp(wordCount / (durationMs / 60000))`
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ]* 3.2 Tulis pengujian properti untuk rumus perhitungan KPM
    - **Property 2: Perhitungan KPM sesuai rumus**
    - **Validates: Requirements 3.1**
  - [ ]* 3.3 Tulis pengujian properti untuk waktu tempuh nol
    - **Property 4: Waktu tempuh nol menghasilkan kesalahan**
    - **Validates: Requirements 3.3**

- [ ] 4. Implementasikan PronunciationAnalyzer
  - [ ] 4.1 Implementasikan fungsi analyzePronunciation
    - Implementasikan `analyzePronunciation(spokenWords: string[], expectedWords: string[]): PronunciationAnalysis`
    - Bandingkan setiap posisi secara case-insensitive; ketidaksesuaian dimasukkan ke daftar kesalahan
    - Tandai kata tanpa pasangan (perbedaan panjang array) sebagai kesalahan dengan `spokenWord` atau `expectedWord` bernilai null
    - Hitung `accuracy = roundHalfUp(correctCount / expectedWords.length * 100)`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [ ]* 4.2 Tulis pengujian properti untuk penangkapan kesalahan pengucapan
    - **Property 5: Kesalahan pengucapan menangkap seluruh ketidaksesuaian posisi**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.5**
  - [ ]* 4.3 Tulis pengujian properti untuk rumus akurasi pengucapan
    - **Property 6: Akurasi pengucapan sesuai rumus**
    - **Validates: Requirements 4.4**

- [ ] 5. Implementasikan ArticulationScorer
  - [ ] 5.1 Implementasikan fungsi scoreArticulation
    - Implementasikan `scoreArticulation(spokenWords: string[], expectedWords: string[]): ArticulationResult | ArticulationError`
    - Kembalikan `ArticulationError` ketika `spokenWords` kosong tanpa melakukan pembagian dengan nol
    - Hitung `score = roundHalfUp(clearWordCount / spokenWords.length * 100)`
    - Kategorikan: Jelas (80-100), Sedang (50-79), Tidak Jelas (0-49)
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ]* 5.2 Tulis pengujian properti untuk rumus dan rentang skor artikulasi
    - **Property 7: Skor artikulasi sesuai rumus dan berada dalam rentang**
    - **Validates: Requirements 5.1, 5.2**
  - [ ]* 5.3 Tulis pengujian properti untuk ambang batas kategori artikulasi
    - **Property 8: Kategori artikulasi sesuai ambang batas**
    - **Validates: Requirements 5.3**
  - [ ]* 5.4 Tulis pengujian properti untuk transkrip kosong
    - **Property 9: Transkrip kosong menghasilkan kesalahan artikulasi**
    - **Validates: Requirements 5.4**
  - [ ]* 5.5 Tulis pengujian properti untuk akurasi sama dengan skor pada panjang kata yang sama
    - **Property 11: Akurasi sama dengan skor untuk panjang kata yang sama**
    - **Validates: Requirements 4.4, 5.1**

- [ ] 6. Checkpoint - Pastikan seluruh pengujian analisis lulus
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implementasikan layanan TextRepository
  - [ ] 7.1 Implementasikan TextRepository dengan teks bacaan per tingkat kesulitan
    - Simpan koleksi teks bacaan per tingkat kesulitan (Mudah 50-100, Sedang 101-200, Sulit 201-300 kata)
    - Implementasikan `getText(difficulty: DifficultyLevel): ReadingText` yang mengembalikan teks dengan jumlah kata sesuai rentang kesulitan
    - _Requirements: 1.1, 1.2_
  - [ ]* 7.2 Tulis pengujian properti untuk jumlah kata dalam rentang kesulitan
    - **Property 1: Teks bacaan memiliki jumlah kata dalam rentang kesulitan**
    - **Validates: Requirements 1.1, 1.2**

- [ ] 8. Implementasikan layanan SpeechRecognitionService
  - [ ] 8.1 Implementasikan SpeechRecognitionService yang membungkus Web Speech API
    - Implementasikan `start(lang)`, `stop()`, `onInterimResult`, `onFinalResult`, `onError` callback
    - Konfigurasikan `SpeechRecognition` dengan `continuous=true`, `interimResults=true`, `lang='id-ID'`
    - Petakan error `'not-allowed'` ke `SpeechRecognitionError` bertipe `permission-denied`
    - Ukur durasi dengan `performance.now()` dari `start()` hingga `stop()`
    - Tangani browser yang tidak mendukung SpeechRecognition (tipe `not-supported`)
    - Lewati kata yang tidak dikenali tanpa menghentikan perekaman
    - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6_
  - [ ]* 8.2 Tulis pengujian integration untuk SpeechRecognitionService
    - Verifikasi `start()` memanggil `SpeechRecognition.start()` dengan konfigurasi benar (continuous=true, interimResults=true, lang='id-ID')
    - Verifikasi hasil interim diteruskan ke callback `onInterimResult`
    - Verifikasi hasil final digabungkan menjadi Transkrip lengkap
    - Verifikasi error `'not-allowed'` menghasilkan `SpeechRecognitionError` bertipe `permission-denied`
    - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6_

- [ ] 9. Implementasikan komponen UI
  - [ ] 9.1 Implementasikan komponen DifficultySelector
    - Render tiga pilihan kesulitan dengan rentang jumlah kata ("Mudah (50-100 kata)", "Sedang (101-200 kata)", "Sulit (201-300 kata)")
    - Nonaktifkan pilihan saat perekaman aktif
    - _Requirements: 1.1_
  - [ ] 9.2 Implementasikan komponen ReadingTextView
    - Tampilkan teks bacaan dengan ukuran font minimum 16 piksel
    - Tampilkan jumlah kata sebagai bilangan bulat
    - _Requirements: 1.2, 1.3_
  - [ ] 9.3 Implementasikan komponen RecordingControls
    - Tombol "Mulai" memicu `onStart`, tombol "Berhenti" memicu `onStop`
    - Tampilkan indikator visual (titik merah berdenyut) saat `isRecording` true
    - _Requirements: 2.2_
  - [ ] 9.4 Implementasikan komponen TranscriptDisplay
    - Tampilkan transkrip parsial yang diperbarui real-time saat perekaman
    - Tampilkan transkrip lengkap setelah perekaman berhenti
    - _Requirements: 2.4, 2.5_
  - [ ] 9.5 Implementasikan komponen ErrorAlert
    - Tampilkan pesan kesalahan yang menjelaskan langkah perbaikan
    - Tombol dismiss memicu `onDismiss`
    - _Requirements: 2.3_
  - [ ] 9.6 Implementasikan komponen ResultsDashboard
    - Tampilkan ringkasan performa di bagian atas (KPM, Akurasi_Pengucapan, Skor_Artikulasi)
    - Tampilkan daftar kesalahan pengucapan detail di bagian bawah
    - Tombol "Ulang" memicu `onRetry`
    - Tangani tampilan `SpeedError` dan `ArticulationError` dengan pesan yang sesuai
    - _Requirements: 3.3, 5.4, 6.1, 6.2, 6.3_
  - [ ]* 9.7 Tulis pengujian UI untuk komponen
    - Verifikasi ReadingTextView menampilkan font 16px dan jumlah kata
    - Verifikasi ResultsDashboard menampilkan ringkasan di bagian atas dan daftar kesalahan
    - Verifikasi RecordingControls menampilkan indikator visual saat perekaman aktif
    - Verifikasi ErrorAlert menampilkan pesan dengan tombol dismiss
    - _Requirements: 1.3, 2.2, 6.1, 6.2_

- [ ] 10. Rakit aplikasi menjadi satu kesatuan
  - [ ] 10.1 Implementasikan komponen App utama yang mengintegrasikan seluruh lapisan
    - Hubungkan DifficultySelector → TextRepository → ReadingTextView
    - Hubungkan RecordingControls → SpeechRecognitionService → TranscriptDisplay
    - Masukkan keluaran SpeechRecognitionService ke SpeedCalculator, PronunciationAnalyzer, dan ArticulationScorer
    - Gabungkan ketiga hasil menjadi `TestResult` → ResultsDashboard
    - Hubungkan ErrorAlert untuk kesalahan SpeechRecognitionService
    - Implementasikan alur ulang: hapus hasil sebelumnya, atur ulang tes, tampilkan Teks_Bacaan baru maupun sama
    - _Requirements: 1.1, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 6.2, 6.3_
  - [ ]* 10.2 Tulis pengujian integration untuk perilaku kontrol ulang
    - Verifikasi kontrol ulang menghapus hasil sebelumnya dan menampilkan teks bacaan baru
    - _Requirements: 6.3_

- [ ] 11. Checkpoint akhir - Pastikan seluruh pengujian lulus
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (minimum 100 iterations via fast-check)
- Unit and integration tests validate specific examples and edge cases
- Analysis functions are implemented as pure functions for testability without DOM/Web Speech API dependencies
- Each property-based test sub-task corresponds to one property from the design document, written in its own dedicated test file

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1", "2.3"] },
    { "id": 2, "tasks": ["2.2", "2.4", "3.1", "4.1", "5.1", "7.1", "8.1", "9.1", "9.2", "9.3", "9.4", "9.5", "9.6"] },
    { "id": 3, "tasks": ["3.2", "3.3", "4.2", "4.3", "5.2", "5.3", "5.4", "5.5", "7.2", "8.2", "9.7"] },
    { "id": 4, "tasks": ["10.1"] },
    { "id": 5, "tasks": ["10.2"] }
  ]
}
```
