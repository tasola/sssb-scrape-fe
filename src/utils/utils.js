export const capitalizeFirstLetter = string =>
  string && string.charAt(0).toUpperCase() + string.slice(1)

export const anglifySwedishLetters = string => {
  return string
    .split('')
    .map(l => {
      if (l === 'å' || l === 'ä') return 'a'
      else if (l === 'ö') return 'o'
      else return l
    })
    .join('')
}

export const range = (start, stop, step) => {
  if (typeof stop == 'undefined') {
    stop = start
    start = 0
  }

  if (typeof step == 'undefined') {
    step = 1
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  var result = []
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }

  return result
}
