const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const Post = require('./models/Post')

const app = express()

// Manual CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

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
    res.status(500).json({ message: err.message })
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
    res.status(500).json({ message: err.message })
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running`)
})

module.exports = app