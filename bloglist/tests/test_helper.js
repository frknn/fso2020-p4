const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: "blog title 1",
    author: "blog author 1",
    url: "https://www.blog1.com",
    likes: 5
  },
  {
    title: "blog title 2",
    author: "blog author 2",
    url: "https://www.blog2.com",
    likes: 6
  },
  {
    title: "blog title 3",
    author: "blog author 1",
    url: "https://www.blog3.com",
    likes: 7
  },
  {
    title: "blog title 4",
    author: "blog author 3",
    url: "https://www.blog4.com",
    likes: 12
  }
]


const nonExistingId = async () => {
  const blog = new Blog({title: "willberemovedsoon"})

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find()

  return blogs
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}