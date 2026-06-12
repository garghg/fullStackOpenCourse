import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client/react'
import { GET_AUTHORS, GET_BOOKS } from '../queries'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('loggedInUser'))
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

  const logout = () => {
    localStorage.removeItem("loggedInUser")
    setToken(null)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token &&  <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      {page === 'authors' && (
        <Authors authors={authorsResult.data.allAuthors} token={token} />
      )}

      {page === 'books' && <Books books={booksResult.data.allBooks} />}

      {page === 'add' && <NewBook />}
      {page === 'login' && <LoginForm setToken={setToken} setPage={setPage} />}
    </div>
  )
}

export default App
