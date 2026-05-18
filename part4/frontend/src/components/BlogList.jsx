import Blog from './Blog'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const BlogList = ({ user, setAlert, blogs, setBlogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>

      <h2>Add New Blog</h2>
      {<BlogForm setAlert={setAlert} setBlogs={setBlogs} blogs={blogs} />}
      {(user && user.name) && (
        <div>
          <h3>Current User</h3>
          {user.name}
        </div>
      )}
    </div>
  )
}

export default BlogList
