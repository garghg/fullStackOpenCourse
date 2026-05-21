import { useAnecdoteActions, useAnecdotes, useFilter } from '../anecdoteStore'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes)
  const filter = useFilter()
  const { vote } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()
  const filtered = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleVote = (anecdote) => {
    setMessage(`Voted: ${anecdote.content}`)
    vote(anecdote.id)
  }

  return (
    <div>
      {filtered.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
