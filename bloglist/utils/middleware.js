const errorHandler = (err, req, res, next) => {
  console.log(`
  -------------ERROR-------------
  ${err.message}
  -------------ERROR-------------
  `)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'malformatted credentials' })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid or missing token' })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
    return next()
  }
  req.token = null
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}