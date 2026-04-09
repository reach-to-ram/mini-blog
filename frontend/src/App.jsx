import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Fetch all posts when page loads
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://mini-blog-seven-liard.vercel.app/posts')
      setPosts(res.data)
    } catch (err) {
      console.log('Error fetching posts:', err)
    }
  }

  const createPost = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://mini-blog-seven-liard.vercel.app/posts', { title, content })
      setTitle('')
      setContent('')
      fetchPosts()
    } catch (err) {
      console.log('Error creating post:', err)
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1> Mini Blog</h1>

      {/* Create Post Form */}
      <form onSubmit={createPost} style={{ marginBottom: '40px' }}>
        <h2>Create a Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px' }}
        >
          Publish Post
        </button>
      </form>

      {/* Posts List */}
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p style={{ color: 'gray' }}>No posts yet. Create one above!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ borderBottom: '1px solid #ddd', marginBottom: '24px', paddingBottom: '24px' }}>
            <h3 style={{ marginBottom: '8px' }}>{post.title}</h3>
            <p style={{ color: '#444', lineHeight: '1.6' }}>{post.content}</p>
            <small style={{ color: 'gray' }}>{new Date(post.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  )
}

export default App