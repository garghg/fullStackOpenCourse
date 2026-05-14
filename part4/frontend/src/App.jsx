import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      const foundUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(foundUser.token)
      setUser(foundUser)
      setUsername('')
      setPassword('')
    } catch {
      console.log('Invalid username or password')
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

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default App