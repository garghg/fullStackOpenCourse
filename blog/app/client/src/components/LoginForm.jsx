import { useState } from 'react'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import BlogContext from '../BlogContext'
import { useContext } from 'react'
import { saveUser } from '../services/persistentUser'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setAlert } = useContext(BlogContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      saveUser(user)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setAlert({
        message: 'Invalid username or password',
        type: 'error',
      })
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to Blogs</h2>
      <form onSubmit={handleLogin}>
        <TextField
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          sx={{ marginBottom: 1 }}
          variant="standard"
          size="small"
        />
        <br />
        <TextField
          type="password"
          label="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          sx={{ marginBottom: 2 }}
          variant="standard"
          size="small"
        />
        <div>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
