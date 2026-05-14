const lodash = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((mostLiked, blog) =>
    blog.likes > mostLiked.likes ? blog : mostLiked
  )
}

const mostBlogs = blogs => lodash.maxBy(blogs, "blogs")

const mostLikes = blogs => lodash.maxBy(blogs, "likes")

module.exports = { dummy, totalLikes, 
                  favoriteBlog, mostBlogs, mostLikes }