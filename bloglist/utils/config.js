require('dotenv').config({path:'./utils/config.env'})

let MONGO_URI = process.env.MONGO_URI
let PORT = process.env.PORT

if(process.env.NODE_ENV === 'test'){
  MONGO_URI = process.env.TEST_MONGO_URI
}

module.exports = {
  MONGO_URI,
  PORT
}