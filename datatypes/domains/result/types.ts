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

/**
 * IIDX score rank (same characters as shown on iidx clear result)
 * from F to AAA.
 */
export type ScoreRank = 'AAA' | 'AA' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
