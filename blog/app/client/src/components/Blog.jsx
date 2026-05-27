import { useNavigate } from 'react-router-dom'
import { Paper, Typography, Button, TextField } from '@mui/material'
import { useNotifActions } from '../notificationStore'
import { useBlogUser, useBlogActions } from '../blogStore'
import { useField } from '../hooks/useField'

const Blog = ({ blog, testLike }) => {
  const navigate = useNavigate()
  const { setAlert } = useNotifActions()
  const { like: addLike, delBlog, addComment } = useBlogActions()
  const user = useBlogUser()
  const { reset: resetComment, ...newComment } = useField()


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

  const handleComment = event => {
    event.preventDefault()
    addComment(blog.id, newComment.value)
    resetComment()
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
        <Typography sx={{ marginTop: 1 }} variant="h6">
          Comments
        </Typography>
        {user && (
          <form onSubmit={handleComment}>
            <TextField
              sx={{ marginBottom: 1, marginRight: 1 }}
              variant="outlined"
              size="small"
              placeholder="add a comment"
              {...newComment}
            />
            <Button variant="contained" type="submit">
              Add
            </Button>
          </form>
        )}
        <ul>
          {blog.comments.map((c) => (
            <li key={c.id}>{c.content}</li>
          ))}
        </ul>
      </div>
    </Paper>
  )
}

export default Blog
