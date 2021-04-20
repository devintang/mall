export const debounce = (func, delay = 200) => {
  let timeout = null
  return function () {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}