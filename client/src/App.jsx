import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { Navbar } from './components/UI'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import PostForm from './pages/PostForm'
import { useState, useEffect } from 'react'
import { api } from './api/posts'

export default function App() {
  const [postCount, setPostCount] = useState(null)
  const location = useLocation()

  // keep navbar count fresh on navigation
  useEffect(() => {
    api.getPosts()
      .then(data => setPostCount(Array.isArray(data) ? data.length : (data.posts || []).length))
      .catch(() => {})
  }, [location.pathname])

  return (
    <ToastProvider>
      <Navbar postCount={postCount} />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/new"       element={<PostForm />} />
          <Route path="/edit/:id"  element={<PostForm />} />
          <Route path="*"          element={
            <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '6rem', fontWeight: 900, color: 'var(--rule)' }}>404</div>
              <p style={{ color: 'var(--ink-muted)', marginTop: '1rem' }}>Page not found.</p>
            </div>
          } />
        </Routes>
      </main>
    </ToastProvider>
  )
}
