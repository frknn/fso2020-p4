const errorHandler = (err, req, res, next) => {
  console.log(`
  -------------ERROR-------------
  ${err.message}
  -------------ERROR-------------
  `)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'malformatted credentials' })
  }
  next(err)
}

module.exports = {
  errorHandler
}