import Togglable from './Togglable'
import LikeButton from './LikeButton'
import DelButton from './delButton'

const Blog = ({ user, blog, blogs, setBlogs }) => {

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
        <LikeButton blog={blog} blogs={blogs} setBlogs={setBlogs} />
        <br />
        {blog.author}
        <br />
        {
          blog.user.id === user.id &&
          <DelButton blogs={blogs} id={blog.id} setBlogs={setBlogs} />
        }
      </Togglable>
    </div>
  )
}

export default Blog