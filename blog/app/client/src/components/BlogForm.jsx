import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import BlogContext from '../BlogContext'
import { useBlogs } from '../hooks/useBlogs'

const BlogForm = ({ testAdd }) => {
  const navigate = useNavigate()
  const { addBlog } = useBlogs()

  const submitHandle = async (event) => {
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    event.preventDefault()
    if (testAdd) {
      await testAdd(newBlog)
    } else {
      await addBlog(newBlog)
    }
    event.target.reset()
    navigate('/')
  }

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={submitHandle}>
        <TextField
          label="title"
          name="title"
          placeholder="Enter Blog Title"
          size="small"
          sx={{ width: '25%' }}
        />
        <br />
        <TextField
          label="url"
          name="url"
          placeholder="Enter Blog URL"
          size="small"
          sx={{ marginTop: 1, width: '25%' }}
        />
        <br />
        <TextField
          label="author"
          name="author"
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
