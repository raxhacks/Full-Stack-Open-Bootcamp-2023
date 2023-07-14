const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Example Blog 1",
    author: "John Doe",
    url: "https://example.com/blog1",
    likes: 10,
  },
  {
    title: "Example Blog 2",
    author: "Jane Smith",
    url: "https://example.com/blog2",
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: "willremovethissoon",
    author: "Gorjuan",
    url: "https://example.com/gorjuanygordalex",
    likes: 10000,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}