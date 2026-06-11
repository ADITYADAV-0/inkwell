const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || data.error || `HTTP ${res.status}`)
  return data
}

export const api = {
  getPosts:     ()         => request('/posts'),
  getPost:      (id)       => request(`/posts/${id}`),
  createPost:   (body)     => request('/posts',      { method: 'POST',   body: JSON.stringify(body) }),
  updatePost:   (id, body) => request(`/posts/${id}`, { method: 'PUT',    body: JSON.stringify(body) }),
  deletePost:   (id)       => request(`/posts/${id}`, { method: 'DELETE' }),
}
