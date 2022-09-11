interface SearchHistoryType {
  value?: string | undefined,
  type: string
}

export const localSearch = ({ value, type }: SearchHistoryType) => {
  if (window.localStorage.getItem('search-history') === null) {
    window.localStorage.setItem('search-history', '[]')
  }
  const history = JSON.parse(window.localStorage.getItem('search-history') as string)
  if (type === 'set') {
    history.unshift(value)
    if (history.length >= 20) {
      history.splice(20)
    }
    window.localStorage.setItem('search-history', JSON.stringify([...new Set(history)]))
  } 
  if (type === 'get') {
    return history
  }
  if (type === 'delete') {
    window.localStorage.setItem('search-history', '[]')
  }
}