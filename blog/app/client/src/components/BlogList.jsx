import Blog from './Blog'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { useBlogUser, useBlogArray } from '../blogStore'


const BlogList = () => {
  const user = useBlogUser()
  const blogs = useBlogArray()
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
