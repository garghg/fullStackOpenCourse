import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ user, blog, blogs, setBlogs, testLike }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5

  }

  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? returnedBlog : b)
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async () => {
    const confirm = window.confirm('Delete Blog?')
    if (!confirm) {
      return
    }
    await blogService.del(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
      </div>
      <br />
      <div>
        {blog.author}
      </div>
      <Togglable showLabel="Show Details" hideLabel="Hide">
        <div>
          {blog.url}
        </div>
        <br />
        <div id='likes'>
          {blog.likes}
        </div>
        <button onClick={testLike || addLike}>Like</button>
        <br />
        {console.log(blog.user)}
        {
          blog.user.id === user.id &&
          <button onClick={deleteBlog}>Delete</button>
        }
      </Togglable>
    </div>
  )
}

export default Blog