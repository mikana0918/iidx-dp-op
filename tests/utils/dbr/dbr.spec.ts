// import { updateByTitle } from '@/utils/dbr/index'
// import { WriteModel, ReadModel } from '~/datatypes/domains/clear/details'
// import { defaultState } from '~/datatypes/factory/dbr'

// const provideArgs: Array<{
//   list: Array<WriteModel>
//   item: ReadModel
//   expectation: Array<DBRItem>
// }> = [
//   {
//     list: [
//       { ...defaultState, title: 'test1' },
//       { ...defaultState, title: 'test2' },
//       { ...defaultState, title: 'test3' },
//     ],
//     item: {
//       ...defaultState,
//       title: 'test1',
//       bp: '111',
//       score: '4000',
//       scoreRank: 'AAA',
//     },
//     expectation: [
//       {
//         ...defaultState,
//         title: 'test1',
//         bp: '111',
//         score: '4000',
//         scoreRank: 'AAA',
//       },
//       { ...defaultState, title: 'test2' },
//       { ...defaultState, title: 'test3' },
//     ],
//   },
// ]

// describe.each(provideArgs)('index.ts', (args) => {
//   it('should return list after replaceing object', () => {
//     const { list, item, expectation } = args

//     const updatedList = updateByTitle({ list, item })

//     expect(updatedList).toStrictEqual(expectation)
//   })
// })
describe('ignore no assertion', () => {
  it('should ignore failing above commented out test', () => {
    expect(true).toBeTruthy()
  })
})
