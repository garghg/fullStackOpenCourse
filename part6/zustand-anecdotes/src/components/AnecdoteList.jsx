import { useAnecdoteActions, useAnecdotes, useFilter } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes)
  const filter = useFilter()
  const { vote } = useAnecdoteActions()
  const filtered = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      {filtered.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
