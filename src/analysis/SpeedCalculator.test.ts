// Pengujian unit (example-based) untuk SpeedCalculator.calculateKPM.
//
// Pengujian properti (Property 2: rumus KPM, Property 4: waktu tempuh nol)
// berada pada berkas terpisah sebagai bagian dari sub-task 3.2 dan 3.3.
//
// Validates: Requirements 3.1, 3.2, 3.3

import { describe, it, expect } from 'vitest'
import { calculateKPM } from './SpeedCalculator'
import type { SpeedResult, SpeedError } from '../types'

describe('calculateKPM', () => {
  describe('waktu tempuh valid (Req 3.1, 3.2)', () => {
    it('menghitung 100 kata dalam 60.000 ms (1 menit) menjadi 100 KPM', () => {
      const result = calculateKPM(100, 60000)
      expect(result).toEqual<SpeedResult>({
        kpm: 100,
        wordCount: 100,
        durationMs: 60000,
      })
    })

    it('menghitung 200 kata dalam 60.000 ms (1 menit) menjadi 200 KPM', () => {
      const result = calculateKPM(200, 60000)
      expect(result).toEqual<SpeedResult>({
        kpm: 200,
        wordCount: 200,
        durationMs: 60000,
      })
    })

    it('menghitung 50 kata dalam 30.000 ms (0,5 menit) menjadi 100 KPM', () => {
      const result = calculateKPM(50, 30000)
      expect(result).toEqual<SpeedResult>({
        kpm: 100,
        wordCount: 50,
        durationMs: 30000,
      })
    })

    it('membulatkan 0,5 ke atas: 1 kata dalam 40.000 ms -> 1,5 -> 2 KPM', () => {
      // 1 / (40000 / 60000) = 1 / 0,666... = 1,5 -> roundHalfUp(1,5) = 2
      const result = calculateKPM(1, 40000)
      expect(result).toEqual<SpeedResult>({
        kpm: 2,
        wordCount: 1,
        durationMs: 40000,
      })
    })

    it('mengembalikan 0 KPM bila jumlah kata nol dengan waktu tempuh valid', () => {
      const result = calculateKPM(0, 60000)
      expect(result).toEqual<SpeedResult>({
        kpm: 0,
        wordCount: 0,
        durationMs: 60000,
      })
    })

    it('mempertahankan nilai input wordCount dan durationMs pada hasil', () => {
      const result = calculateKPM(123, 45000)
      expect(result).toMatchObject({
        wordCount: 123,
        durationMs: 45000,
      })
    })
  })

  describe('waktu tempuh nol (Req 3.3)', () => {
    it('mengembalikan SpeedError bila durationMs === 0', () => {
      const result = calculateKPM(100, 0)
      expect(result).toEqual<SpeedError>({
        type: 'invalid-duration',
        message: 'Waktu tempuh tidak valid',
      })
    })

    it('mengembalikan SpeedError dengan tipe yang tepat', () => {
      const result = calculateKPM(0, 0)
      expect((result as SpeedError).type).toBe('invalid-duration')
    })

    it('tidak mengandung field KPM (tidak melakukan pembagian dengan nol)', () => {
      const result = calculateKPM(100, 0) as SpeedError
      expect(result).not.toHaveProperty('kpm')
      expect(result).not.toHaveProperty('wordCount')
      expect(result).not.toHaveProperty('durationMs')
    })
  })
})
