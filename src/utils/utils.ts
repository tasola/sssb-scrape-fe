export const capitalizeFirstLetter = (string: string): string =>
  string && string.charAt(0).toUpperCase() + string.slice(1)

export const anglifySwedishLetters = (string: string): string => {
  return string
    .split('')
    .map((l) => {
      if (l === 'å' || l === 'ä') return 'a'
      else if (l === 'ö') return 'o'
      else return l
    })
    .join('')
}

// Sort arrays as the order of the items does not matter
export const arraysEqual = (a, b) => {
  const _a = a.slice()
  const _b = b.slice()

  if (_a === _b) return true
  if (_a == null || _b == null) return false
  if (_a.length !== _b.length) return false

  _a.sort()
  _b.sort()

  for (let i = 0; i < _a.length; ++i) {
    if (_a[i] !== _b[i]) return false
  }
  return true
}

export const range = (start: number, stop?: number, step = 1): number[] => {
  if (typeof stop == 'undefined') {
    stop = start
    start = 0
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  const result: number[] = []
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }

  return result
}
