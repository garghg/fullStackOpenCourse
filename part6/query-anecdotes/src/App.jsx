import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hooks/useAnecdotes'
import useNotification from './hooks/useNotification'

const App = () => {
  const { setAlert } = useNotification()
  const { anecdotes, isPending, isError, updateAnec } = useAnecdotes()

  const handleVote = (anecdote) => {
    setAlert(`Voted: ${anecdote.content}`)
    updateAnec(anecdote)
  }

  if (isPending) {
    return (
      <div>
        loading data...
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        Anecdote service not available
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
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

export default App