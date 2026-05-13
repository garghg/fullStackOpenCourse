const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'admin',
        name: 'Admin User',
        password: 'admin123'
    },
    {
        username: 'johndoe',
        name: 'John Doe',
        password: 'john123'
    },
    {
        username: 'janedoe',
        name: 'Jane Doe',
        password: 'jane123'
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { 
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDB
}