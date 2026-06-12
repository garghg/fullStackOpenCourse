import { useQuery } from '@apollo/client/react'
import { GET_USER, GET_BOOKS } from '../../queries'

const Recommended = () => {
  const user = useQuery(GET_USER)
  const favGenre = user.data?.me?.favoriteGenre
  const booksResult = useQuery(GET_BOOKS, {
    variables: { genre: favGenre },
    skip: !favGenre,
  })

  if (user.loading || booksResult.loading) return <div>loading...</div>

  const books = booksResult.data.allBooks
  return (
    <div>
      <h2>Recommendations</h2>
      <p>You favourite genre is {favGenre}, so you might like:</p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.length > 0 &&
            books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {books.length <= 0 && <div>no recommendations</div>}
    </div>
  )
}

export default Recommended
