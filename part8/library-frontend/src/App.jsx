import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { GET_AUTHORS, GET_BOOKS } from '../queries'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('loggedInUser'))
  const [page, setPage] = useState('authors')

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
        <Authors token={token} />
      )}

      {page === 'books' && <Books />}

      {page === 'add' && <NewBook />}
      {page === 'login' && <LoginForm setToken={setToken} setPage={setPage} />}
    </div>
  )
}

export default App
