const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseURL)
  if (!response.ok) {
    throw new Error('Could not fetch notes from server')
  }
  return await response.json()
}

export const create = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }

    const response = await fetch(baseURL, options)
    if (!response.ok) {
        throw new Error('Could not add new anecdote')
    }

    return await response.json()
}

export const update = async (updated) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
    }

    const response = await fetch(`${baseURL}/${updated.id}`, options)
    if (!response.ok) {
        throw new Error('Could not update anecdote')
    }

    return await response.json()
} 
