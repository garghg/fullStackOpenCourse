import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { SET_BIRTH } from '../../queries'


const AuthorForm = ({ authors }) => {
  const [year, setYear] = useState('')
  const [name, setName] = useState(authors[0].name)

  const [editAuthor] = useMutation(SET_BIRTH, {
    onError: (error) => {
      console.log('mutation error:', error)
    },
  })

  const handleBirthEdit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(year) } })
  }
  return (
    <form onSubmit={handleBirthEdit}>
      <h3>Set Birth Year</h3>
      <div>
        <label>
          Name
          <select onChange={(event) => setName(event.target.value)}>
            {authors.map((a) => (
              <option value={a.name} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Born
          <input
            type="text"
            placeholder="Enter new birth year"
            onChange={(event) => setYear(event.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">Update author</button>
      </div>
    </form>
  )
}

export default AuthorForm
