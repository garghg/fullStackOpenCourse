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
import ErrorBoundary from './ErrorBoundary'
import { useBlogs } from './hooks/useBlogs'

const App = () => {
  const [user, setUser] = useState(null)
  const { blogs, isPending } = useBlogs()

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

  if (isPending) {
    return (
      <div>
        loading...
      </div>
    )
  }

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
                <Button
                  sx={buttonStyle}
                  color="inherit"
                  component={Link}
                  to="/create"
                >
                  Create Blog
                </Button>
              )}
              {!user && (
                <Button
                  sx={buttonStyle}
                  color="inherit"
                  component={Link}
                  to="/login"
                >
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

        <Notification />

        <Routes>
          <Route
            path="/create"
            element={
              <ErrorBoundary>
                <BlogForm blogs={blogs} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ErrorBoundary>
                <Blog
                  user={user}
                  blog={blog}
                />
              </ErrorBoundary>
            }
          />
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <BlogList blogs={blogs} user={user} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <ErrorBoundary>
                <LoginForm setUser={setUser} />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<h2>404 - Page not found</h2>} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
