import { DBRItem } from '~/datatypes/domains/clear/details'

export const updateByTitle = ({
  list,
  item,
}: {
  list: DBRItem[]
  item: DBRItem
}): DBRItem[] => {
  return list.map((l) => {
    return l.title === item.title ? item : l // replace item when the title is same
  })
}
