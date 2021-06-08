/**
 * IIDX clear type(same characters as shown on iidx clear result)
 * (e.g.)
 * clear with normal gauge: CLEAR
 * clear with full combo: F-COMBO
 * etc
 */
export type ClearRamp =
  | 'NO PLAY'
  | 'FAILED'
  | 'A-CLEAR'
  | 'E-CLEAR'
  | 'CLEAR'
  | 'H-CLEAR'
  | 'EXH-CLEAR'
  | 'F-COMBO'

export const clearRamps: Array<ClearRamp> = [
  'NO PLAY',
  'A-CLEAR',
  'E-CLEAR',
  'CLEAR',
  'H-CLEAR',
  'EXH-CLEAR',
  'F-COMBO',
]
/**
 * IIDX score rank (same characters as shown on iidx clear result)
 * from F to AAA.
 */
export type ScoreRank = 'AAA' | 'AA' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type Difficulty = 'Leggendaria' | 'Another' | 'Hyper' | 'Normal'

export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
