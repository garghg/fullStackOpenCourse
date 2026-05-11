const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('get blogs as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('get all blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id name for all blogs', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        assert(blog.id);
        assert(!blog._id);
    })
})

test('post a valid blog', async () => {
    const newBlog = {
        title: "Node.js Best Practices: Part 2",
        author: "Michael Brown II",
        url: "www.example.com",
        blogs: 1,
        likes: 15
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
    const contents = blogsAtEnd.map(blog => blog.title)
    assert(contents.includes(newBlog.title));
})

test('default likes to 0', async () => {
    const newBlog = {
        title: "Node.js Best Practices: Part 3",
        author: "Michael Brown III",
        url: "www.example.com",
        blogs: 1,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
    
    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual(blogs[blogs.length - 1].likes, 0);

})

test('cannot add invalid blog', async () => {
    const newBlog = {
        title: "Node.js Best Practices: Part 4",
        author: "Michael Brown IV",
        blogs: 1,
        likes: 2
    }

    const response_status = await api
        .post('/api/blogs')
        .send(newBlog)

    assert.strictEqual(response_status.status, 400)
    
    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual(blogs.length, helper.initialBlogs.length);

})

after(async () => {
  await mongoose.connection.close()
})