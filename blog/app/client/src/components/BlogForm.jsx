import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useNotifActions } from '../notificationStore'
import { useField } from '../hooks/useField'
import { useBlogActions } from '../blogStore'

const BlogForm = ({ testAdd }) => {
  const { reset: resetTitle, ...title } = useField()
  const { reset: resetUrl, ...url } = useField()
  const { reset: resetAuthor, ...author } = useField()
  const navigate = useNavigate()
  const { setAlert } = useNotifActions()
  const { create } = useBlogActions()

  const submitHandle = async (event) => {
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    event.preventDefault()
    if (testAdd) {
      await testAdd(newBlog)
    } else {
      await handleAdd(newBlog)
    }
  }

  const handleAdd = async (newBlog) => {
    const response = await create(newBlog)
    if (response) {
      setAlert(`Added ${title.value}`, 'success')
    } else {
      setAlert('Something went wrong', 'error')
    }
    setTimeout(() => {
      setAlert(null)
    }, 5000)
    resetTitle()
    resetAuthor()
    resetUrl()
    navigate('/')
  }

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={submitHandle}>
        <TextField
          label="title"
          {...title}
          placeholder="Enter Blog Title"
          size="small"
          sx={{ width: '25%' }}
        />
        <br />
        <TextField
          label="url"
          {...url}
          placeholder="Enter Blog URL"
          size="small"
          sx={{ marginTop: 1, width: '25%' }}
        />
        <br />
        <TextField
          label="author"
          {...author}
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
