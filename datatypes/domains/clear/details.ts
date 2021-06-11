import {
  ClearRamp,
  ScoreRank,
  Difficulty,
  Level,
} from '~/datatypes/domains/result/types'

// this interface declaratin might be more abstract
// if other iidx music play clear details are same as this definition.
interface DBRItem {
  bp: string
  clearRamp: ClearRamp
  result: string
  score: string
  scoreRank: ScoreRank
  // difficulty: Difficulty
  // level: Level
  // title: string
}

/**
 * Type definition for DBR master data
 */
interface DBRMaster {
  level: Level
  title: string
  difficulty: Difficulty
}

export interface WriteModel extends DBRItem {
  id: string
}
export interface ReadModel extends DBRMaster {}
