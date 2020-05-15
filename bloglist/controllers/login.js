const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const router = require('express').Router()
const User = require('../models/User')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const pwMatch = user === null ? false :
    await bcryptjs.compare(password, user.password)

  if (!(user && pwMatch)) {
    return res.status(401).json({
      error: 'invalid credentials'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, SECRET)

  res.status(200).json({
    token,
    username: user.username,
    name: user.name,
    id: user._id
  })
})

module.exports = router