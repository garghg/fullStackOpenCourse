import blogService from '../services/blogs'

const LikeButton = ({ blog, blogs, setBlogs }) => {

  const addLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? returnedBlog : b)
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  return (
    <div>
      <button onClick={addLike}>
                Like
      </button>
    </div>
  )
}

export default LikeButton