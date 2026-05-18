import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ user, setAlert, blogs, setBlogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
      <h2>Add New Blog</h2>
      {<BlogForm setAlert={setAlert} setBlogs={setBlogs} blogs={blogs} />}
      {user && (
        <div>
          <h3>Current User</h3>
          {user.name}
        </div>
      )}
    </div>
  )
}

export default BlogList
