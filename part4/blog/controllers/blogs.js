const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!request.body.title || !request.body.url) {
  return response.status(400).end()
}

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
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