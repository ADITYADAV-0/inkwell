import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/posts'
import { useToast } from '../context/ToastContext'

export function usePosts() {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const toast = useToast()

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getPosts()
      setPosts(Array.isArray(data) ? data : data.posts || data.data || [])
    } catch (err) {
      setError(err.message)
      toast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const createPost = async (body) => {
    const post = await api.createPost(body)
    setPosts(prev => [post, ...prev])
    toast('Post published ✦', 'success')
    return post
  }

  const updatePost = async (id, body) => {
    const post = await api.updatePost(id, body)
    setPosts(prev => prev.map(p => (p._id === id ? post : p)))
    toast('Post updated ✦', 'success')
    return post
  }

  const deletePost = async (id) => {
    await api.deletePost(id)
    setPosts(prev => prev.filter(p => p._id !== id))
    toast('Post deleted', 'info')
  }

  return { posts, loading, error, fetchPosts, createPost, updatePost, deletePost }
}
