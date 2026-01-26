export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.warn(`${url} ошибка:`, error)
    return null
  }
}
