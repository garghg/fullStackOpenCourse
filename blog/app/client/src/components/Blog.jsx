import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { Paper, Typography, Button } from '@mui/material'

const Blog = ({ user, blog, setBlogs, blogs, testLike }) => {
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 10,
  }

  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    const updatedBlogs = blogs.map((b) =>
      b.id === blog.id ? { ...returnedBlog, user: blog.user } : b,
    )
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async () => {
    const confirm = window.confirm('Delete Blog?')
    if (!confirm) {
      return
    }
    await blogService.del(blog.id)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
    navigate('/')
  }

  const fontColor = 'rgb(138, 131, 129)'

  return (
    <Paper sx={{ padding: 2, marginTop: 3 }} elevation={3}>
      <div style={blogStyle}>
        <Typography variant="h6">{blog.title}</Typography>
        <br />
        <Typography sx={{ color: fontColor }}>{blog.author}</Typography>
        <Typography component="a" href={blog.url} variant="body">
          {blog.url}
        </Typography>
        <Typography sx={{ marginTop: 1 }}>{blog.likes} Likes</Typography>
        {user && (
          <Button
            onClick={testLike || addLike}
            variant="outlined"
            sx={{
              marginRight: 1,
              marginTop: 1,
              borderColor: 'rgb(0, 255, 0)',
              borderWidth: 2,
            }}
          >
            Like
          </Button>
        )}
        {user && blog.user.id === user.id && (
          <Button
            onClick={deleteBlog}
            variant="outlined"
            sx={{ marginTop: 1, borderColor: 'rgb(255, 0, 0)', borderWidth: 2 }}
          >
            Delete
          </Button>
        )}
      </div>
    </Paper>
  )
}

export default Blog
