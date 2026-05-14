import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [alert, setAlert] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setAlert({
        message: 'Invalid username or password',
        type: 'error'
      })
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
            username
            <input 
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
        </label>
      </div>
      <div>
        <label>
            password
            <input 
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    const response = blogService.create(newBlog)
    if (response) {
      setAlert({
        message: `Added ${title}`,
        type: 'success'
      })
    } else {
      setAlert({
        message: 'Something went wrong',
        type: 'error'
      })
    }
    setTimeout(() => {
        setAlert(null)
      }, 5000)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title
          <input 
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          url
          <input 
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input 
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <button type='submit'>Add Blog</button>
      </div>
    </form>
  )

  return (
    <div>
      {alert &&
        <div className={alert.type}>
          {alert.message}
        </div>
      }
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <h2>
            Add New Blog
          </h2>
          {blogForm()}
          <br />
          <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default App