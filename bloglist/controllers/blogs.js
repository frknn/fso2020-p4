const router = require('express').Router()
const Blog = require('../models/Blog')

router.get('/', (req, res) => {
  Blog.find()
    .then(blogs => res.json(blogs))
})

router.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then(blog => res.status(201).json(blog))
})

module.exports = router