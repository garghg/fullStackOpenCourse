import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ setAlert, setBlogs, blogs, testAdd }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const blogFormRef = useRef()

  const submitHandle = event => {
    const newBlog = {
      title,
      author,
      url
    }
    event.preventDefault()
    if (testAdd) {
      testAdd(newBlog)
    } else {
      addBlog(newBlog)
    }
  }


  const addBlog = async newBlog => {
    const response = await blogService.create(newBlog)
    if (response) {
      blogFormRef.current.toggleVisibility()
      setAlert({
        message: `Added ${title}`,
        type: 'success'
      })
    } else {
      setAlert({
        message: 'Something went wrong',
        type: 'error'
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
    <Togglable showLabel={'Create new blog'} ref={blogFormRef}>
      <form onSubmit={submitHandle}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder='Enter Blog Title'
            />
          </label>
        </div>

        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder='Enter Blog URL'
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder='Enter Blog Author'
            />
          </label>
        </div>
        <div>
          <button type='submit'>Add Blog</button>
        </div>
      </form>
    </ Togglable>
  )
}

export default BlogForm