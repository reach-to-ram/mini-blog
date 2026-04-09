const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Post = require('./models/Post')

const app = express()

// Middleware
app.use(cors({
  origin: 'https://mini-blog-3ewp.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ Connection error:', err))

// GET all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST create a new post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body
    const newPost = new Post({ title, content })
    await newPost.save()
    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`)
})