import * as Factory from 'factory.ts'
import { DBRItem } from '~/datatypes/domains/clear/details'

export const defaultState: DBRItem = {
  bp: '0',
  clearRamp: 'FAILED',
  difficulty: 'Normal',
  level: 1,
  result: '',
  score: '0',
  scoreRank: 'F',
  title: '',
}

export const dbrItemFactory = (dbrItem: DBRItem) =>
  Factory.Sync.makeFactory<DBRItem>(dbrItem)
