const router = require('express').Router()
const User = require('../models/User')
const bcryptjs = require('bcryptjs')

router.post('/', async (req, res, next) => {

  const body = req.body

  if (body.password.length < 3) {

    return res.status(400).json({ error: 'malformatted credentials' })
  }

  const saltRounds = 10

  const hashedPassword = await bcryptjs.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()

    res.json(savedUser)
  } catch (err) {
    next(err)
  }

})

router.get('/', async (req, res) => {
  const users = await User.find().populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  res.json(users)
})

module.exports = router