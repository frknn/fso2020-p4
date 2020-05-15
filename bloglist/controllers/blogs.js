const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

router.get('/', async (req, res) => {

  const blogs = await Blog.find().populate('user')
  res.json(blogs)

})

router.post('/', async (req, res, next) => {

  const body = req.body

  try {
    const decodedToken = jwt.verify(req.token, SECRET)

    if (!body.title || !body.url) {
      return res.status(400).json({ error: 'Please provide both title and url.' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      ...req.body,
      user: user._id
    })
    const savedBlog = await (await blog.save()).populate('user').execPopulate()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {

  try {
    const decodedToken = jwt.verify(req.token, SECRET)
    const blogToDelete = await Blog.findById(req.params.id)
    const user = await User.findById(decodedToken.id)

    if (!(blogToDelete.user.toString() === user._id.toString())) {
      return res.status(401).json({ error: 'Not authorized to perform this operation.' })
    }

    const indexOfDeletedBlog = user.blogs.indexOf(blogToDelete._id)
    user.blogs.splice(indexOfDeletedBlog,1)

    const result = await blogToDelete.remove()
    await user.save()
    if (result) {
      res.status(204).end()
    } else {
      return res.status(404).end()
    }

  } catch (err) {
    next(err)
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

  const result = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, { new: true }).populate('user')

  res.json(result)

})

router.post('/:id/comments', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  blog.comments.push(req.body.comment)
  await blog.save()
  const result = await Blog.findById(req.params.id).populate('user')
  res.json(result)
})
module.exports = router