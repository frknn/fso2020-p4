const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

router.get('/', async (req, res) => {

  const blogs = await Blog.find().populate('user')
  res.json(blogs)

})

router.post('/', async (req, res) => {

  const body = req.body

  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: 'Please provide both title and url.' })
  }

  const users = await User.find()

  const user = users[0];

  const blog = new Blog({
    ...req.body,
    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)

})

router.delete('/:id', async (req, res) => {

  const result = await Blog.findByIdAndRemove(req.params.id)
  if (result) {
    res.status(204).end()
  } else {
    return res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  const body = req.body

  const blogToUpdate = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  }

  const result = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, { new: true })

  res.json(result)

})

module.exports = router