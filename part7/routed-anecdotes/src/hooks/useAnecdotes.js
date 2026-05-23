import anecdoteService from '../services/anecdotes'
import { useEffect, useState } from 'react'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = async (anecdote) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    setAnecdotes([...anecdotes, newAnecdote])
  }

  const delAnecdote = async (id) => {
    await anecdoteService.del(id)
    setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
  }

  return {
    anecdotes,
    addAnecdote,
    delAnecdote
  }
}
