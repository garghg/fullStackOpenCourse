import blogServices from '../services/blogs'

const DelButton = ({ id, blogs, setBlogs }) => {
    
    const deleteBlog = async () => {
        const confirm = window.confirm("Delete Blog?")
        if (!confirm) {
            return
        }
        await blogServices.del(id)
        setBlogs(blogs.filter(b => b.id !== id))
    }

    return (
        <div>
            <button onClick={deleteBlog}>
                Delete
            </button>
        </div>
    )
}

export default DelButton