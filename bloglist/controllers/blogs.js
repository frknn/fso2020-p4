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

module.exports = router