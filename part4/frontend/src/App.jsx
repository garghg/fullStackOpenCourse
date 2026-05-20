import './index.css'
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import { Container, AppBar, Button, Toolbar, Typography } from '@mui/material'
import Notification from './components/Notification'

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

  const buttonStyle = {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <Container>
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Blogs
              </Typography>
              <Button sx={buttonStyle} color="inherit" component={Link} to="/">
                BLogs
              </Button>
              {user && (
                <Button sx={buttonStyle} color="inherit" component={Link} to="/create">
                  Create Blog
                </Button>
              )}
              {!user && (
                <Button sx={buttonStyle} color="inherit" component={Link} to="/login">
                  Login
                </Button>
              )}
              {user && (
                <Button sx={buttonStyle} color="inherit" onClick={logout}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </div>

        <Notification alert={alert} />

        <Routes>
          <Route
            path="/create"
            element={
              <BlogForm setAlert={setAlert} setBlogs={setBlogs} blogs={blogs} />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog user={user} blog={blog} blogs={blogs} setBlogs={setBlogs} />
            }
          />
          <Route path="/" element={<BlogList blogs={blogs} user={user} />} />
          <Route
            path="/login"
            element={<LoginForm setUser={setUser} setAlert={setAlert} />}
          />
        </Routes>
      </div>
    </Container>
  )
}

export default App
