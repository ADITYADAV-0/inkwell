import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/posts'
import { useToast } from '../context/ToastContext'
import { BackButton, Btn, Icon } from '../components/UI'

const FIELDS = [
  { id: 'title',   label: 'Post Title',  type: 'input',    placeholder: 'An unforgettable headline…',        required: true,  max: 120 },
  { id: 'summary', label: 'Summary',     type: 'input',    placeholder: 'A brief teaser for your readers…',  required: true,  max: 200 },
  { id: 'content', label: 'Content',     type: 'textarea', placeholder: 'Write your story here. Be honest, be bold, be you…', required: true },
]

const inputStyle = {
  fontFamily: "'DM Sans', sans-serif", fontSize: '.975rem', fontWeight: 300,
  background: 'var(--card-bg)', border: '1.5px solid var(--rule)',
  borderRadius: 'var(--r)', padding: '.75rem 1rem',
  color: 'var(--ink)', outline: 'none', width: '100%',
  transition: 'border-color .2s',
  resize: 'none',
}

const labelStyle = {
  fontSize: '.8rem', fontWeight: 500, letterSpacing: '.06em',
  textTransform: 'uppercase', color: 'var(--ink-soft)',
  display: 'block', marginBottom: '.5rem',
}

export default function PostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({ title: '', summary: '', content: '', author: '', category: '' })
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    if (!isEdit) return
    api.getPost(id)
      .then(post => setForm({
        title:    post.title    || '',
        summary:  post.summary  || post.description || '',
        content:  post.content  || '',
        author:   post.author   || '',
        category: post.category || '',
      }))
      .catch(err => { toast(err.message, 'error'); navigate('/') })
      .finally(() => setLoading(false))
  }, [id])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const validate = () => {
    if (!form.title.trim())   { toast('Title is required', 'error'); return false }
    if (!form.summary.trim()) { toast('Summary is required', 'error'); return false }
    if (!form.content.trim()) { toast('Content is required', 'error'); return false }
    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    try {
      if (isEdit) {
        await api.updatePost(id, form)
        toast('Post updated ✦', 'success')
        navigate(`/posts/${id}`)
      } else {
        const post = await api.createPost(form)
        toast('Post published ✦', 'success')
        navigate(`/posts/${post._id}`)
      }
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--ink-muted)' }}>
        <Icon.Spinner />
        <span style={{ fontSize: '.875rem' }}>Loading post…</span>
      </div>
    </div>
  )

  return (
    <div style={{ animation: 'fadeUp .4s ease' }}>
      <div style={{
        maxWidth: '760px', margin: '0 auto',
        padding: 'clamp(2rem,6vw,5rem) clamp(1rem,4vw,2rem)',
      }}>
        <BackButton onClick={() => navigate('/')} label="Discard & go back" />

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 900,
            letterSpacing: '-.02em', marginBottom: '.5rem',
          }}>
            {isEdit ? 'Refine Your Story' : 'Craft a New Story'}
          </h1>
          <p style={{ color: 'var(--ink-muted)', fontWeight: 300 }}>
            {isEdit
              ? 'Every story can be made better.'
              : 'Share your ideas with the world. Every great story starts with a blank page.'}
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Title */}
          <div>
            <label style={labelStyle}>Post Title *</label>
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="An unforgettable headline…"
              maxLength={120}
              style={{ ...inputStyle, borderColor: focused === 'title' ? 'var(--ink)' : 'var(--rule)' }}
              onFocus={() => setFocused('title')}
              onBlur={() => setFocused(null)}
            />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.72rem', color: 'var(--ink-muted)', textAlign: 'right', marginTop: '.25rem' }}>
              <span style={{ color: form.title.length > 108 ? 'var(--accent)' : 'inherit' }}>{form.title.length}</span>/120
            </div>
          </div>

          {/* Author + Category row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Author</label>
              <input
                value={form.author}
                onChange={e => set('author', e.target.value)}
                placeholder="Your name…"
                style={{ ...inputStyle, borderColor: focused === 'author' ? 'var(--ink)' : 'var(--rule)' }}
                onFocus={() => setFocused('author')}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <input
                value={form.category}
                onChange={e => set('category', e.target.value)}
                placeholder="e.g. Technology, Life, Travel"
                style={{ ...inputStyle, borderColor: focused === 'category' ? 'var(--ink)' : 'var(--rule)' }}
                onFocus={() => setFocused('category')}
                onBlur={() => setFocused(null)}
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label style={labelStyle}>Summary *</label>
            <input
              value={form.summary}
              onChange={e => set('summary', e.target.value)}
              placeholder="A brief teaser for your readers…"
              maxLength={200}
              style={{ ...inputStyle, borderColor: focused === 'summary' ? 'var(--ink)' : 'var(--rule)' }}
              onFocus={() => setFocused('summary')}
              onBlur={() => setFocused(null)}
            />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '.72rem', color: 'var(--ink-muted)', textAlign: 'right', marginTop: '.25rem' }}>
              <span style={{ color: form.summary.length > 180 ? 'var(--accent)' : 'inherit' }}>{form.summary.length}</span>/200
            </div>
          </div>

          {/* Content */}
          <div>
            <label style={labelStyle}>Content *</label>
            <textarea
              value={form.content}
              onChange={e => set('content', e.target.value)}
              placeholder="Write your story here. Be honest, be bold, be you…"
              rows={16}
              style={{
                ...inputStyle,
                lineHeight: 1.7,
                borderColor: focused === 'content' ? 'var(--ink)' : 'var(--rule)',
              }}
              onFocus={() => setFocused('content')}
              onBlur={() => setFocused(null)}
            />
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'flex-end',
            paddingTop: '1.5rem', borderTop: '1px solid var(--rule)',
          }}>
            <Btn variant="ghost" onClick={() => navigate('/')}>Cancel</Btn>
            <Btn
              variant="accent"
              icon={submitting ? <Icon.Spinner /> : <Icon.Send />}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? (isEdit ? 'Saving…' : 'Publishing…')
                : (isEdit ? 'Save Changes' : 'Publish Post')}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
