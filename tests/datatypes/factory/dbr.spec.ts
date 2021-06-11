import {
  defaultStateForCommand,
  defaultStateForQuery,
  dbrItemFactoryForCommand,
  dbrItemFactoryForQuery,
} from '@/datatypes/factory/dbr'
import { WriteModel, ReadModel } from '~/datatypes/domains/clear/details'

describe('dbr.ts', () => {
  it('should return default command state', () => {
    const created: WriteModel = dbrItemFactoryForCommand(
      defaultStateForCommand
    ).build()

    expect(created).toMatchObject(defaultStateForCommand)
  })
  it('should return default query state', () => {
    const created: ReadModel = dbrItemFactoryForQuery(
      defaultStateForQuery
    ).build()

    expect(created).toMatchObject(defaultStateForQuery)
  })
})
