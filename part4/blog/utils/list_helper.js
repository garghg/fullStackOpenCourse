const Blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}


// ***********************
// fix this
// ***********************

const totalLikes = () => {
  return Blog.find({}).then((blogs) => {
    return blogs.reduce((total, blog) => total += blog.likes, 0)
  })
}

module.exports = { dummy, totalLikes }