const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Learning MongoDB with Mongoose",
        author: "John Doe",
        url: "www.example.com",
        blogs: 2,
        likes: 10
    },
    {
        title: "Understanding JavaScript Closures",
        author: "Jane Smith",
        url: "www.example.com",
        blogs: 4,
        likes: 25
    },
    {
        title: "Node.js Best Practices",
        author: "Michael Brown",
        url: "www.example.com",
        blogs: 3,
        likes: 30
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }