// RoundUtils: Fungsi murni pembulatan untuk Lapisan Analisis.
// Sumber: RoundUtils pada design.md (requirement 3.2)

/**
 * Membulatkan sebuah nilai desimal ke bilangan bulat terdekat, dengan nilai
 * desimal tepat 0,5 dibulatkan ke atas (menuju tak hingga positif).
 *
 * Rumus yang digunakan adalah `Math.floor(value + 0.5)`, yang merupakan
 * implementasi standar pembulatan setengah ke atas (round-half-up):
 *   - Untuk setiap bilangan bulat n, `roundHalfUp(n + 0.5)` menghasilkan `n + 1`.
 *   - Nilai 0,5 dibulatkan ke atas, sehingga -1,5 menjadi -1 (menuju positif).
 *   - Fungsi ini bersifat idempoten: `roundHalfUp(roundHalfUp(x))` sama dengan
 *     `roundHalfUp(x)`, karena hasilnya selalu bilangan bulat.
 *
 * Catatan titik-mengambang: untuk bilangan bulat dalam rentang aman
 * (`Number.MAX_SAFE_INTEGER`), `n + 0,5` dan `n + 1,0` terwakili secara eksak,
 * sehingga sifat `roundHalfUp(n + 0,5) === n + 1` terpenuhi secara presisi.
 *
 * @param value - Nilai desimal yang akan dibulatkan.
 * @returns Bilangan bulat hasil pembulatan setengah ke atas.
 *
 * @example
 * roundHalfUp(2.4);   // 2
 * roundHalfUp(2.5);   // 3  (0,5 dibulatkan ke atas)
 * roundHalfUp(-1.5);  // -1 (0,5 dibulatkan ke atas menuju positif)
 * roundHalfUp(0);     // 0
 *
 * Validates: Requirements 3.2
 */
export function roundHalfUp(value: number): number {
  return Math.floor(value + 0.5);
}
