export default (fn, time) => {
  let timer = null
  return () => {
    if (!timer) {
      fn()
      timer = setTimeout(() => {
        timer = null
      }, time)
    }
  }
}