const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseURL)
  if (!response.ok) {
    throw new Error('Could not fetch notes from server')
  }
  return await response.json()
}
