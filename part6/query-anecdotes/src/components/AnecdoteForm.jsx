import { useAnecdotes } from "../hooks/useAnecdotes"
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { setAlert } = useNotify()
  const { addAnecdote } = useAnecdotes() 

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    setAlert(`Added: ${content}`)
    addAnecdote(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm