const router = require('express').Router()
const Blog = require('../models/Blog')

router.get('/', async (req, res) => {

  const blogs = await Blog.find()
  res.json(blogs)

})

router.post('/', async (req, res) => {

  if (!req.body.title || !req.body.url) {
    return res.status(400).json({ error: 'Please provide both title and url.' })
  }

  const blog = new Blog(req.body)
  const savedBlog = await blog.save()
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