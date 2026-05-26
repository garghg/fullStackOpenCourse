import { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useNotifActions } from '../notificationStore'

const BlogForm = ({ setBlogs, blogs, testAdd }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()
  const { setAlert } = useNotifActions()

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
  }

  const addBlog = async (newBlog) => {
    const response = await blogService.create(newBlog)
    if (response) {
      setAlert(`Added ${title}`, 'success')
    } else {
      setAlert('Something went wrong', 'error')
    }
    setTimeout(() => {
      setAlert(null)
    }, 5000)
    setBlogs(blogs.concat(response))
    setTitle('')
    setUrl('')
    setAuthor('')
    navigate('/')
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
