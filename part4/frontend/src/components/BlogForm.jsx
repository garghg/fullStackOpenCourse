import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ setAlert, setBlogs, blogs, testAdd }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const blogFormRef = useRef()
  const navigate = useNavigate()

  const submitHandle = async (event) => {
    const newBlog = {
      title,
      author,
      url,
    }
    event.preventDefault()
    if (testAdd) {
      await testAdd(newBlog)
    } else {
      await addBlog(newBlog)
    }
    navigate('/')
  }

  const addBlog = async (newBlog) => {
    const response = await blogService.create(newBlog)
    if (response) {
      blogFormRef.current.toggleVisibility()
      setAlert({
        message: `Added ${title}`,
        type: 'success',
      })
    } else {
      setAlert({
        message: 'Something went wrong',
        type: 'error',
      })
    }
    setTimeout(() => {
      setAlert(null)
    }, 5000)
    setBlogs(blogs.concat(response))
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={submitHandle}>
        <TextField
          label="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter Blog Title"
          size="small"
          sx={{ width: '25%' }}
        />
        <br />
        <TextField
          label="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Enter Blog URL"
          size="small"
          sx={{ marginTop: 1, width: '25%' }}
        />
        <br />
        <TextField
          label="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Enter Blog Author"
          size="small"
          sx={{ marginTop: 1, width: '25%' }}
        />
        <div>
          <Button type="submit" variant="contained" sx={{ marginTop: 10 }}>
            Add Blog
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
