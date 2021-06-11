export const cloneDeep = <T>({ obj }: { obj: T }) =>
  JSON.parse(JSON.stringify(obj))
