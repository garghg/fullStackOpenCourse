import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client/react'
import { GET_AUTHORS, GET_BOOKS } from '../queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(GET_AUTHORS, {
    skip: page !== 'authors',
  })

  const booksResult = useQuery(GET_BOOKS, {
    skip: page !== 'books',
  })

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {page === 'authors' && (
        <Authors authors={authorsResult.data.allAuthors} />
      )}

      {page === 'books' && <Books books={booksResult.data.allBooks} />}

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
