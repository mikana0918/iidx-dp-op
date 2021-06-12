import * as Factory from 'factory.ts'
import { WriteModel, ReadModel } from '~/datatypes/domains/clear/details'

export const defaultStateForCommand: WriteModel = {
  masterId: 0,
  bp: '',
  clearRamp: 'NO PLAY',
  result: '',
  score: '',
  scoreRank: 'F',
}

export const defaultStateForQuery: ReadModel = {
  id: 0,
  level: 1,
  title: '',
  difficulty: 'Normal',
}

export const dbrItemFactoryForCommand = (dbrItem: WriteModel) =>
  Factory.Sync.makeFactory<WriteModel>(dbrItem)

export const dbrItemFactoryForQuery = (dbrItem: ReadModel) =>
  Factory.Sync.makeFactory<ReadModel>(dbrItem)
