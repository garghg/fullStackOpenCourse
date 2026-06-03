import { useState } from 'react'
import { SET_BIRTH } from '../../queries'
import { useMutation } from '@apollo/client/react'

const Authors = ({ authors }) => {
  const [year, setYear] = useState('')
  const [name, setName] = useState(authors[0].name)
  const [editAuthor] = useMutation(SET_BIRTH)

  const handleBirthEdit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(year) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set Birth Year</h3>
      <form onSubmit={handleBirthEdit}>
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
    </div>
  )
}

export default Authors
