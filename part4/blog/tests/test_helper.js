const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Learning MongoDB with Mongoose",
        author: "John Doe",
        blogs: 2,
        likes: 10
    },
    {
        title: "Understanding JavaScript Closures",
        author: "Jane Smith",
        blogs: 4,
        likes: 25
    },
    {
        title: "Node.js Best Practices",
        author: "Michael Brown",
        blogs: 3,
        likes: 30
    }
]

module.exports = { initialBlogs }