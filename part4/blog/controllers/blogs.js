const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, _id: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'Invalid userId' })
  }

  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'Invalid userId' })
  }

  const target = await Blog.findById(request.params.id)
  if (!target) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (target.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Delete access not granted' })
  }
  await target.deleteOne()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, blogs, likes } = request.body

  const target = await Blog.findById(request.params.id)
  if (!target) {
    return response.status(404).end()
  }

  target.title = title;
  target.author = author;
  target.url = url;
  target.blogs = blogs;
  target.likes = likes;

  const updatedBlog = await target.save()
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter