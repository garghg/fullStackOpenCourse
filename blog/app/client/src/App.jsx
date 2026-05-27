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
import { useNavigate } from 'react-router-dom'
import { useBlogArray, useBlogUser, useBlogActions } from './blogStore'
import { getUser, removeUser } from './services/persistentUser'
import UserList from './components/UserList'
import userService from './services/users'
import User from './components/User'

const App = () => {
  const blogs = useBlogArray()
  const { initialize, setUser } = useBlogActions()
  const user = useBlogUser()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => initialize(blogs))
  }, [user, initialize])

  useEffect(() => {
    const savedUser = getUser()
    if (savedUser) {
      setUser(savedUser)
    }
  }, [setUser])

  const logout = () => {
    removeUser()
    setUser(null)
    navigate('/')
  }

  const buttonStyle = {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  }

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null
  const matchUser = useMatch('/users/:id')
  const matchedUser = matchUser
    ? users.find((blog) => blog.id === matchUser.params.id)
    : null

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
              <Button
                sx={buttonStyle}
                color="inherit"
                component={Link}
                to="/users"
              >
                Users
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
                <BlogForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ErrorBoundary>
                <Blog blog={blog} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <BlogList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <ErrorBoundary>
                <LoginForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users"
            element={
              <ErrorBoundary>
                <UserList users={users} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ErrorBoundary>
                <User user={matchedUser} />
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
