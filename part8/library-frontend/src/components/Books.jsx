import { useQuery } from '@apollo/client/react'
import { GET_BOOKS, GET_GENRES } from '../../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState(null)
  const booksResult = useQuery(GET_BOOKS, {
    variables: { genre },
  })
  const genreResult = useQuery(GET_GENRES)

  if (booksResult.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  const genreList = genreResult.data.allGenres
  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre(null)}>All</button>
      {genreList.map((g) => (
        <button onClick={() => setGenre(g)} key={g}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
