import { useAnecdoteActions } from '../anecdoteStore'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { setMessage } = useNotificationActions()

  const addHandler = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    setMessage(`Anecdote Added: ${content}`)
    await add(content)
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
