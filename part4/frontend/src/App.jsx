import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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

  return (
    <div>
      {alert &&
        <div className={alert.type}>
          {alert.message}
        </div>
      }
      {
        !user &&
        <LoginForm
          setUser={setUser}
          setAlert={setAlert}
        />
      }
      {user && (
        <div>
          <h2>
            Add New Blog
          </h2>
          {
            <BlogForm
              setAlert={setAlert}
              setBlogs={setBlogs}
              blogs={blogs}
            />
          }
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              user={user}
            />
          )}
          <h3>Current User</h3>
          {user.name}
          <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default App