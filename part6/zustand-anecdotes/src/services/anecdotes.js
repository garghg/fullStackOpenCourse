const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Could not get notes from server')
  }
  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Could not create new note')
  }
  return await response.json()
}

const update = async (id, anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  }

  const response = await fetch(`${baseUrl}/${id}`, options)
  if (!response.ok) {
    throw new Error('Could not update votes')
  }
  return await response.json()
}

const del = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Could not delete note from server')
  }
  return await response.json()
}

export default { getAll, createNew, update, del }
