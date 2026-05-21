import { useAnecdoteActions, useFilteredAnecdotes } from '../anecdoteStore'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const { vote, delAnecdote } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()
  const filtered = useFilteredAnecdotes()

  const handleVote = (anecdote) => {
    setMessage(`Voted: ${anecdote.content}`)
    vote(anecdote.id)
  }

  const handleDel = (anecdote) => {
    setMessage(`Deleted: ${anecdote.content}`)
    delAnecdote(anecdote.id)
  }

  return (
    <div>
      {filtered.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && 
              <button onClick={() => handleDel(anecdote)}>Delete</button>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
