const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./test_helper')
const Blog = require('../models/Blog')

const api = supertest(app)

const { initialBlogs, blogsInDb, nonExistingId } = testHelper

beforeEach(async () => {

  jest.setTimeout(10000);

  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


describe('blog-rest-api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('unique identifier of a blog post is named id', async () => {
    const response = await api.get('/api/blogs')

    for (let blog of response.body) {
      expect(blog['id']).toBeDefined()
    }
  })

  test('a valid blog saved correctly to db', async () => {
    const blogToSave = new Blog({
      title: "Test Blog To Add",
      author: "Test Author of Blog",
      url: "https://www.testblog.com",
      likes: 2
    })

    await api
      .post('/api/blogs')
      .send(blogToSave)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blogToSave.title)
  })

  test('if likes property did not provided, it is set 0 as default', async () => {
    const blogWithoutLikesProperty = new Blog({
      title: "Blog Without Likes Prop",
      author: "Test Author of Blog Without Likes Prop",
      url: "https://www.testblogwithoutlikesprop.com",
    })

    await api
      .post('/api/blogs')
      .send(blogWithoutLikesProperty)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd[initialBlogs.length].likes).toBe(0)

  })

  test('when title or url missing, return 400 Bad Request', async () => {
    const blogWithoutTitleAndUrl = new Blog({
      url: "https://www.testblogwithouttitleandurl.com",
      likes: 3
    })

    await api
      .post('/api/blogs')
      .send(blogWithoutTitleAndUrl)
      .expect(400)
  })

})


afterAll(() => {
  mongoose.connection.close()
})

