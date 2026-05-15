import blogService from '../services/blogs'

const LikeButton = ({ blog, setBlogs }) => {

    const addLike = async () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        const returnedBlog = await blogService.update(blog.id, updatedBlog)
        setBlogs(prev => prev.map(b => b.id === blog.id ? returnedBlog : b))
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