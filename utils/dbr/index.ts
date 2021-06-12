// import { DBRItem } from '~/datatypes/domains/clear/details'
// import { logger } from '~/logging/index'

// export const updateByTitle = ({
//   list,
//   item,
// }: {
//   list: DBRItem[]
//   item: DBRItem
// }): DBRItem[] => {
//   if (!item.title) logger.warn('no title given for item')
//   return list.map((l) => {
//     return l.title === item.title ? item : l // replace item when the title is same
//   })
// }
