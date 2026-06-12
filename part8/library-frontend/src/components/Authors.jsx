import { GET_AUTHORS } from '../../queries'
import AuthorForm from './AuthorForm'
import { useQuery } from '@apollo/client/react'

const Authors = ({ token }) => {
  const authorResult = useQuery(GET_AUTHORS)

  if (authorResult.loading) return <div>loading...</div>
  const authors = authorResult.data.allAuthors

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
      {token && <AuthorForm authors={authorResult.data.allAuthors} />}
    </div>
  )
}

export default Authors
