import { useNavigate } from 'react-router-dom'
import { Paper, Typography, Button } from '@mui/material'
import { useNotifActions } from '../notificationStore'
import { useBlogActions } from '../blogStore'

const Blog = ({ user, blog, testLike }) => {
  const navigate = useNavigate()
  const { setAlert } = useNotifActions()
  const { like: addLike, delBlog } = useBlogActions()

  if (!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 10,
  }

  const handleDel = async () => {
    const confirm = window.confirm('Delete Blog?')
    if (!confirm) {
      return
    }
    delBlog(blog.id)
    setAlert(`Deleted ${blog.title}`, 'success')
    setTimeout(() => setAlert(null), 5000)
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
            onClick={testLike || (() => addLike(blog))}
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
            onClick={handleDel}
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
