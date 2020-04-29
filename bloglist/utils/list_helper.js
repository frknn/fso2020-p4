const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
}

const mostBlogs = (blogs) => {

  let lookup = {}
  let arr = []
  let maxBlogs;
  let resultObj = {}

  blogs.map(blog => blog.author).forEach(author => {
    lookup[author] = lookup[author] ? lookup[author] + 1 : 1
  })

  for (const author in lookup) {
    arr.push(lookup[author])
  }

  maxBlogs = Math.max(...arr)

  for (const author in lookup) {
    if (lookup[author] === maxBlogs) {
      resultObj.author = author;
      resultObj.blogs = maxBlogs
    }
  }

  return resultObj;
}

const mostLikes = (blogs) => {

  let resArr = []
  let maxLikes;
  let resultObj = {}

  let arr = blogs.map(blog => ({ author: blog.author, likes: blog.likes }))

  let myobj = arr.reduce((result, item) => {
    result[item.author] = result[item.author] || 0
    result[item.author] = result[item.author] + item.likes
    return result
  }, {})

  for (const author in myobj) {
    resArr.push(myobj[author])
  }

  maxLikes = Math.max(...resArr)

  for (const author in myobj) {
    if (myobj[author] === maxLikes) {
      resultObj.author = author;
      resultObj.likes = maxLikes
    }
  }

  return resultObj;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}