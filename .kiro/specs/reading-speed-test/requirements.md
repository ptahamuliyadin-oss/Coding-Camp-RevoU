# Requirements Document

## Introduction

Dokumen ini mendefinisikan kebutuhan untuk fitur Situs Tes Kecepatan Membaca, sebuah aplikasi web yang memungkinkan Pengguna melakukan tes membaca nyaring. Situs menampilkan Teks_Bacaan, menangkap ucapan Pengguna melalui mikrofon, lalu menghitung kecepatan membaca dalam satuan Kata Per Menit (KPM), menganalisis kesalahan pengucapan dengan membandingkan kata yang diucapkan terhadap kata yang diharapkan, menilai kejelasan artikulasi, dan menampilkan seluruh hasil dalam satu Dashboard_Hasil yang terpadu.

## Glossary

- **Situs**: Aplikasi web tes kecepatan membaca yang menjadi sistem utama.
- **Pengguna**: Orang yang melakukan tes membaca nyaring.
- **Teks_Bacaan**: Paragraf teks yang ditampilkan kepada Pengguna untuk dibaca nyaring.
- **Pengenal_Ucapan**: Komponen yang menangkap suara melalui mikrofon dan mentranskripsi ucapan menjadi teks.
- **Penghitung_Kecepatan**: Komponen yang menghitung kecepatan membaca Pengguna.
- **Analisis_Pengucapan**: Komponen yang membandingkan kata yang diucapkan terhadap kata yang diharapkan dalam Teks_Bacaan.
- **Analisis_Artikulasi**: Komponen yang menilai kejelasan artikulasi ucapan Pengguna.
- **Dashboard_Hasil**: Tampilan yang merangkum seluruh hasil tes membaca.
- **KPM**: Kata Per Menit, satuan kecepatan membaca.
- **Transkrip**: Teks hasil transkripsi ucapan Pengguna dari Pengenal_Ucapan.
- **Kata_Diharapkan**: Kata yang ada dalam Teks_Bacaan pada posisi tertentu.
- **Kata_Diucapkan**: Kata yang dikenali dalam Transkrip pada posisi tertentu.
- **Akurasi_Pengucapan**: Persentase kata yang diucapkan sesuai dengan Teks_Bacaan.
- **Skor_Artikulasi**: Nilai kejelasan artikulasi pada skala 0 hingga 100.

## Requirements

### Requirement 1: Menampilkan Teks Bacaan

**User Story:** Sebagai Pengguna, aku ingin memilih tingkat kesulitan dan melihat teks bacaan, sehingga aku bisa membaca nyaring sesuai kemampuanku.

#### Acceptance Criteria

1. KETIKA Pengguna memilih tingkat kesulitan, Situs HARUS menampilkan satu Teks_Bacaan yang sesuai dengan tingkat kesulitan yang dipilih, dengan tingkat kesulitan terdiri dari tiga pilihan: Mudah (50-100 kata), Sedang (101-200 kata), dan Sulit (201-300 kata).
2. Situs HARUS menampilkan setiap Teks_Bacaan beserta jumlah kata sebagai bilangan bulat.
3. Situs HARUS menampilkan Teks_Bacaan dengan ukuran font minimum 16 piksel agar mudah dibaca.

### Requirement 2: Menangkap dan Mentranskripsi Ucapan

**User Story:** Sebagai Pengguna, aku ingin memulai tes dan merekam suaraku, sehingga suaraku dapat dianalisis oleh Pengenal_Ucapan.

#### Acceptance Criteria

1. KETIKA Pengguna mengaktifkan kontrol mulai, Situs HARUS meminta akses mikrofon dan mulai menangkap ucapan melalui mikrofon.
2. SELAMA ucapan sedang ditangkap, Situs HARUS menampilkan indikator visual bahwa perekaman sedang aktif.
3. JIKA akses mikrofon ditolak, MAKA Situs HARUS menampilkan pesan kesalahan yang menjelaskan langkah untuk mengaktifkan akses mikrofon.
4. SELAMA Pengguna membaca nyaring dan perekaman berlangsung, Pengenal_Ucapan HARUS menampilkan Transkrip sebagian yang diperbarui saat kata diucapkan dan dikenali.
5. KETIKA Pengguna mengaktifkan kontrol berhenti, Pengenal_Ucapan HARUS menampilkan Transkrip lengkap sebagai teks yang memuat seluruh kata yang dikenali dari perekaman.
6. JIKA Pengenal_Ucapan tidak dapat mengenali sebuah kata yang diucapkan, MAKA Pengenal_Ucapan HARUS melewati kata tersebut dan melanjutkan transkripsi kata berikutnya tanpa menghentikan perekaman.

### Requirement 3: Menghitung Kecepatan Membaca

**User Story:** Sebagai Pengguna, aku ingin mengetahui kecepatan membaca dalam KPM, sehingga aku bisa mengukur kemampuan membaca.

#### Acceptance Criteria

1. KETIKA Pengguna selesai membaca, Penghitung_Kecepatan HARUS menghitung kecepatan membaca sebagai jumlah kata dalam Transkrip dibagi waktu tempuh dalam menit, dengan waktu tempuh diukur sejak Pengguna memulai membaca hingga Pengguna selesai membaca.
2. KETIKA kecepatan membaca berhasil dihitung, Penghitung_Kecepatan HARUS menyajikan hasil kecepatan membaca dalam satuan KPM yang dibulatkan ke bilangan bulat terdekat, dengan nilai desimal 0,5 dibulatkan ke atas.
3. JIKA waktu tempuh bernilai nol, MAKA Penghitung_Kecepatan HARUS menampilkan indikasi kesalahan yang menyatakan bahwa waktu tempuh tidak valid serta tidak melakukan pembagian dengan nol.

### Requirement 4: Menganalisis Kesalahan Pengucapan

**User Story:** Sebagai Pengguna, aku ingin melihat kata mana yang aku salah ucapkan, sehingga aku bisa memperbaiki pengucapan.

#### Acceptance Criteria

1. KETIKA Pengguna selesai membaca, Analisis_Pengucapan HARUS membandingkan setiap Kata_Diucapkan terhadap Kata_Diharapkan yang berada pada posisi yang sama dalam Teks_Bacaan.
2. JIKA sebuah Kata_Diucapkan berbeda secara teks (tanpa memperhatikan perbedaan huruf besar dan kecil) dengan Kata_Diharapkan, MAKA Analisis_Pengucapan HARUS menandai pasangan Kata_Diucapkan dan Kata_Diharapkan tersebut sebagai kesalahan pengucapan dan memasukkannya ke dalam daftar kesalahan.
3. KETIKA daftar kesalahan telah disusun, Analisis_Pengucapan HARUS menampilkan daftar kesalahan yang menunjukkan setiap kata yang salah ucapkan beserta Kata_Diharapkan yang seharusnya.
4. KETIKA perbandingan kata telah selesai, Analisis_Pengucapan HARUS menghitung Akurasi_Pengucapan sebagai jumlah kata yang benar dibagi jumlah seluruh Kata_Diharapkan, dinyatakan dalam persentase yang dibulatkan ke bilangan bulat terdekat.
5. JIKA jumlah Kata_Diucapkan tidak sama dengan jumlah Kata_Diharapkan, MAKA Analisis_Pengucapan HARUS menandai Kata_Diucapkan atau Kata_Diharapkan yang tidak memiliki pasangan sebagai kesalahan pengucapan.

### Requirement 5: Menilai Kejelasan Artikulasi

**User Story:** Sebagai Pengguna, aku ingin mendapat Skor_Artikulasi, sehingga aku bisa mengetahui seberapa jelas aku mengucapkan kata.

#### Acceptance Criteria

1. KETIKA Pengguna selesai membaca seluruh teks yang disediakan, Analisis_Artikulasi HARUS menghitung Skor_Artikulasi berdasarkan proporsi kata yang dikenali dengan jelas dalam Transkrip, yaitu jumlah kata yang dikenali dengan jelas dibagi jumlah seluruh kata dalam Transkrip dikali 100, dengan kata dianggap dikenali dengan jelas apabila kata dalam Transkrip cocok dengan kata yang sesuai dalam Teks_Bacaan.
2. KETIKA Skor_Artikulasi dihitung, Analisis_Artikulasi HARUS menampilkan Skor_Artikulasi pada skala 0 hingga 100.
3. KETIKA Skor_Artikulasi dihitung, Analisis_Artikulasi HARUS mengelompokkan kejelasan artikulasi ke dalam kategori berdasarkan ambang batas skor yang ditetapkan: Jelas untuk skor 80 sampai 100, Sedang untuk skor 50 sampai 79, dan Tidak Jelas untuk skor 0 sampai 49.
4. JIKA Transkrip tidak memuat kata, MAKA Analisis_Artikulasi HARUS menampilkan pesan kesalahan dan tidak menghitung Skor_Artikulasi.

### Requirement 6: Menampilkan Dashboard Hasil

**User Story:** Sebagai Pengguna, aku ingin melihat seluruh hasil dalam satu tampilan, sehingga aku bisa meninjau performa membaca secara menyeluruh.

#### Acceptance Criteria

1. KETIKA seluruh hasil tes telah dihitung, Dashboard_Hasil HARUS menampilkan kecepatan membaca dalam KPM, daftar kesalahan pengucapan, Akurasi_Pengucapan, dan Skor_Artikulasi secara bersamaan dalam satu halaman hasil.
2. KETIKA seluruh hasil tes telah dihitung, Dashboard_Hasil HARUS menampilkan ringkasan performa membaca yang berisi kecepatan membaca dalam KPM, Akurasi_Pengucapan, dan Skor_Artikulasi di bagian atas halaman hasil.
3. KETIKA Pengguna mengaktifkan kontrol ulang, Situs HARUS menghapus hasil tes sebelumnya dari tampilan, mengatur ulang tes, dan menampilkan Teks_Bacaan untuk percobaan baru, baik Teks_Bacaan baru maupun Teks_Bacaan yang sama dengan tes sebelumnya.
