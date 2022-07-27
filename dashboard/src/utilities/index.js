export function humanize(str) {
  if(isUndefined(str))
    return undefined 
  
  str = str.toString()
  return str[0].toUpperCase() + str.substring(1)
}

export function isUndefined(str) {
  if(typeof str === typeof undefined)
    return true

  return false
}
