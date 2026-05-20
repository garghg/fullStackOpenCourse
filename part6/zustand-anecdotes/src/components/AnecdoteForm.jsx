import { useAnecdoteActions } from "../store"

const AnecdoteForm = () => {
  
    const { add } = useAnecdoteActions()

  const addHandler = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    add(content)
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