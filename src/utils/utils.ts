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
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
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
