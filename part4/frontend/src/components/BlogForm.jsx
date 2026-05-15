import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ setAlert, setBlogs, blogs }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')
    const blogFormRef = useRef()


    const addBlog = async event => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url
        }
        const response = await blogService.create(newBlog)
        if (response) {
            blogFormRef.current.toggleVisibility()
            setAlert({
                message: `Added ${title}`,
                type: 'success'
            })
        } else {
            setAlert({
                message: 'Something went wrong',
                type: 'error'
            })
        }
        setTimeout(() => {
            setAlert(null)
        }, 5000)
        setBlogs(blogs.concat(response))
        setTitle('')
        setUrl('')
        setAuthor('')
    }

    return (
        <Togglable buttonLabel={"Create new blog"} ref={blogFormRef}>
            <form onSubmit={addBlog}>
                <div>
                    <label>
                        title
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        url
                        <input
                            type="text"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type='submit'>Add Blog</button>
                </div>
            </form>
        </ Togglable>
    )
}

export default BlogForm