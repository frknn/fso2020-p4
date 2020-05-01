const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogs = require('./controllers/blogs')
const users = require('./controllers/users')

// express app
const app = express()

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to DB'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogs)
app.use('/api/users', users)

app.use(middleware.errorHandler)

module.exports = app
