// Fungsi utilitas normalisasi kata untuk Lapisan Analisis.
// Sumber: WordUtils pada design.md (requirements 4.2)

/**
 * Menormalisasi kata: mengubah huruf menjadi kecil dan menghapus tanda baca
 * serta karakter non-alfanumerik lainnya (Req 4.2).
 *
 * Normalisasi bersifat idempoten: `normalizeWord(normalizeWord(word))` sama
 * dengan `normalizeWord(word)` (Property 10). Urutan operasi — huruf kecil
 * dahulu, lalu hapus karakter non-alfanumerik — penting untuk idempotensi.
 * Beberapa huruf besar (mis. İ U+0130) menghasilkan tanda diakritik ketika
 * diubah ke huruf kecil; tanda tersebut dihapus oleh regex pada langkah kedua,
 * sehingga hasil akhir hanya memuat huruf/angka kecil yang stabil terhadap
 * normalisasi ulang.
 *
 * @param word - Kata yang akan dinormalisasi.
 * @returns Kata ternormalisasi (huruf kecil, tanpa tanda baca).
 */
export function normalizeWord(word: string): string {
  // Ubah ke huruf kecil, lalu hapus semua karakter yang bukan huruf (\p{L})
  // atau angka (\p{N}). Flag 'u' mengaktifkan mode Unicode agar property
  // escape \p{...} dikenali.
  return word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

/**
 * Memecah teks menjadi array kata ternormalisasi (Req 4.2).
 *
 * Teks dipecah berdasarkan spasi (memperlakukan beberapa spasi berurutan
 * sebagai satu pemisah), setiap pecahan dinormalisasi dengan
 * `normalizeWord`, lalu string kosong — yang timbul dari spasi di awal/akhir,
 * spasi berlebih, atau kata yang hanya memuat tanda baca — disaring keluar.
 *
 * @param text - Teks yang akan dipecah.
 * @returns Array kata ternormalisasi (tidak memuat string kosong).
 */
export function splitWords(text: string): string[] {
  return text
    .split(/\s+/)
    .map((word) => normalizeWord(word))
    .filter((word) => word !== '');
}
