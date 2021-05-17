import { ClearRamp, ScoreRank } from '~/datatypes/domains/result/types'
// this interface declaratin might be more abstract
// if other iidx music play clear details are same as this definition.
export interface DBRItem {
  BP: number
  clearRamp: ClearRamp
  difficulty: string
  level: number
  result: string // [TODO] resource URL? such as firebase?
  score: number
  scoreRank: ScoreRank
  title: string
}
