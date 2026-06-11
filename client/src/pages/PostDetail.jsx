import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/posts'
import { useToast } from '../context/ToastContext'
import { BackButton, Btn, Icon, Skeleton, ConfirmModal } from '../components/UI'

function formatDate(str) {
  const d = new Date(str)
  if (isNaN(d)) return '—'
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function wordCount(text = '') {
  const wc = text.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(wc / 200))} min read`
}

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getPost(id)
        setPost(data)
      } catch (err) {
        toast(err.message, 'error')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleDelete = async () => {
    try {
      await api.deletePost(id)
      toast('Post deleted', 'info')
      navigate('/')
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  return (
    <div style={{ animation: 'fadeUp .4s ease' }}>
      <div style={{
        maxWidth: '720px', margin: '0 auto',
        padding: 'clamp(2rem,6vw,5rem) clamp(1rem,4vw,2rem)',
      }}>
        <BackButton onClick={() => navigate('/')} label="Back to all posts" />

        {loading ? (
          <div>
            <Skeleton width="40%" height="12px" style={{ marginBottom: '1rem' }} />
            <Skeleton width="80%" height="44px" style={{ marginBottom: '10px' }} />
            <Skeleton width="55%" height="44px" style={{ marginBottom: '2rem' }} />
            <Skeleton width="100%" height="12px" style={{ marginBottom: '10px' }} />
            <Skeleton width="95%" height="12px" style={{ marginBottom: '10px' }} />
            <Skeleton width="88%" height="12px" style={{ marginBottom: '10px' }} />
            <Skeleton width="76%" height="12px" />
          </div>
        ) : post ? (
          <>
            {/* Post header */}
            <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: '.72rem',
                letterSpacing: '.14em', textTransform: 'uppercase',
                color: 'var(--accent)', marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: '.5rem',
              }}>
                <span style={{ width: '20px', height: '1px', background: 'currentColor', display: 'inline-block' }} />
                {post.category || 'Essay'}
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 900,
                lineHeight: 1.1, letterSpacing: '-.03em',
                marginBottom: '1.25rem',
              }}>
                {post.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {post.author && (
                  <>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.825rem', color: 'var(--ink-muted)', fontWeight: 300 }}>
                      <Icon.User /> {post.author}
                    </span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--rule)', display: 'inline-block' }} />
                  </>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.825rem', color: 'var(--ink-muted)', fontWeight: 300 }}>
                  <Icon.Calendar /> {formatDate(post.createdAt || post.date)}
                </span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--rule)', display: 'inline-block' }} />
                <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.825rem', color: 'var(--ink-muted)', fontWeight: 300 }}>
                  <Icon.Clock /> {wordCount(post.content)}
                </span>
              </div>
            </div>

            {/* Ornament */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              color: 'var(--rule)', fontSize: '1.2rem', margin: '2rem 0',
            }}>
              <span style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
              ✦
              <span style={{ flex: 1, height: '1px', background: 'var(--rule)' }} />
            </div>

            {/* Content */}
            <div style={{
              fontSize: '1.1rem', lineHeight: 1.85,
              color: 'var(--ink-soft)', fontWeight: 300,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {post.content}
            </div>

            {/* Action bar */}
            <div style={{
              display: 'flex', gap: '1rem', marginTop: '3rem',
              paddingTop: '2rem', borderTop: '1px solid var(--rule)',
            }}>
              <Btn variant="ghost" icon={<Icon.Edit />} onClick={() => navigate(`/edit/${id}`)}>
                Edit Post
              </Btn>
              <Btn variant="danger" icon={<Icon.Trash />} onClick={() => setShowDelete(true)}>
                Delete Post
              </Btn>
            </div>
          </>
        ) : null}
      </div>

      {showDelete && (
        <ConfirmModal
          title="Delete this post?"
          message="This action cannot be undone. The story will be permanently removed from your blog."
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  )
}
