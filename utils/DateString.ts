export const dateToString = (date: Date): string => {
  const yyyy = date.getFullYear()
  const MM = ('0' + (date.getUTCMonth() + 1)).slice(-2)
  const dd = ('0' + date.getUTCDate()).slice(-2)
  const hh = ('0' + date.getUTCHours()).slice(-2)
  const mm = ('0' + date.getUTCMinutes()).slice(-2)
  const ss = ('0' + date.getUTCSeconds()).slice(-2)
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}
