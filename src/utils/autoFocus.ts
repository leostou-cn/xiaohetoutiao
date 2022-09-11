export const  autoFocusInputEach = (el: HTMLElement) => {
  if (el.tagName === 'INPUT') {
    return el.focus()
  }
  if (el.children.length) {
    const childrenArr = Array.from(el.children)
    for (let index = 0; index < childrenArr.length; index++) {
      if (autoFocusInputEach(childrenArr[index])) {
        break
      }
    }
  }
  return false
}