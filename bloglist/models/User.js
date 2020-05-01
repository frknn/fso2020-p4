const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true, minlength: 3 },
  password: { type: String, required: true },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.password
  }
})

module.exports = mongoose.model('User', userSchema)

