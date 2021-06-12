// Should this function require certain generics?
export const arrayIncludesArray = ({
  x,
  y,
}: {
  x: Array<any>
  y: Array<any>
}) => x.some((x1) => y.includes(x1))
