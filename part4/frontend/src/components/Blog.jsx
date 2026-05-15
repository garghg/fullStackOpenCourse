import Togglable from "./Togglable"
import LikeButton from "./LikeButton"

const Blog = ({ blog, setBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5

  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable showLabel="Show Details" hideLabel="Hide">
        {blog.url}
        <br />
        {blog.likes}
        <LikeButton blog={blog} setBlogs={setBlogs} />
        <br />
        {blog.author}
        <br />
      </Togglable>
    </div>
  )
}

export default Blog