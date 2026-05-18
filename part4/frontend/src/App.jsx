import './index.css'
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { Routes, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      {alert && <div className={alert.type}>{alert.message}</div>}
      <div>
        <Link style={padding} to={'/'}>
          Blogs
        </Link>
        {!user && (
          <Link style={padding} to={'/login'}>
            Login
          </Link>
        )}
        {user && (
          <button style={padding} onClick={logout}>
            Logout
          </button>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              user={user}
              setBlogs={setBlogs}
              setAlert={setAlert}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginForm setUser={setUser} setAlert={setAlert} />}
        />
      </Routes>
    </div>
  )
}

export default App
