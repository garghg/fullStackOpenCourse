import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { GET_AUTHORS, GET_BOOKS, BOOK_ADDED } from '../queries'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import { addBookToCache } from './utils/apolloCache'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('loggedInUser'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem("loggedInUser")
    setToken(null)
  }

  useSubscription(BOOK_ADDED, {
  onData: ({ data }) => {
    const addedBook = data.data.bookAdded
    window.alert(`${addedBook.title} added`)
    addBookToCache(client.cache, addedBook)
  }
})

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token &&  <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      {page === 'authors' && (
        <Authors token={token} />
      )}

      {page === 'books' && <Books />}

      {page === 'add' && <NewBook />}
      {page === 'login' && <LoginForm setToken={setToken} setPage={setPage} />}
      {page === 'recommended' && <Recommended />}
    </div>
  )
}

export default App
