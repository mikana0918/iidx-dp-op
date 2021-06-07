import { defaultState, dbrItemFactory } from '@/datatypes/factory/dbr'
import { DBRItem } from '~/datatypes/domains/clear/details'

describe('dbr.ts', () => {
  it('should return default state via factory', () => {
    const created: DBRItem = dbrItemFactory(defaultState).build()

    expect(created).toMatchObject(defaultState)
  })
})
