import { useContext } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import BlogContext from '../BlogContext'
import { useBlogs } from '../hooks/useBlogs'

const BlogList = () => {
  const { user } = useContext(BlogContext)
  const { blogs } = useBlogs()

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
