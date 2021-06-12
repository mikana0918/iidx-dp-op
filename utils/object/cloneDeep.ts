export const cloneDeep = ({ obj }: { obj: Array<any> | object }) =>
  JSON.parse(JSON.stringify(obj))
