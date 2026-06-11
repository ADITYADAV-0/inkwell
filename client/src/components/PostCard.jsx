import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, IconBtn } from './UI'

function formatDate(str) {
  const d = new Date(str)
  if (isNaN(d)) return '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function wordCount(text = '') {
  const wc = text.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(wc / 200))} min read`
}

export default function PostCard({ post, onDelete }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const id = post._id || post.id

  return (
    <article
      onClick={() => navigate(`/posts/${id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--rule)',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all .25s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, var(--accent), var(--gold))',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform .3s ease',
      }} />

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.75rem' }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '.72rem',
            color: 'var(--ink-muted)', letterSpacing: '.04em',
          }}>
            {formatDate(post.createdAt || post.date)}
          </span>
          <span style={{
            fontSize: '.7rem', fontWeight: 500, letterSpacing: '.06em',
            textTransform: 'uppercase', padding: '.2rem .6rem',
            background: 'var(--cream)', color: 'var(--ink-soft)', borderRadius: '999px',
          }}>
            {post.category || 'Essay'}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3,
          color: 'var(--ink)', marginBottom: '.6rem', letterSpacing: '-.01em',
        }}>
          {post.title}
        </h3>

        {/* Summary */}
        <p style={{
          color: 'var(--ink-muted)', fontSize: '.9rem', fontWeight: 300,
          lineHeight: 1.65, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {post.summary || post.description || ''}
        </p>
      </div>

      {/* Card footer */}
      <div style={{
        padding: '.9rem 1.5rem',
        borderTop: '1px solid var(--rule)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--cream)',
      }}>
        <span style={{
          fontSize: '.8rem', fontWeight: 500, color: 'var(--accent)',
          display: 'flex', alignItems: 'center', gap: '.35rem',
        }}>
          <Icon.Clock /> {wordCount(post.content)}
        </span>

        <div style={{ display: 'flex', gap: '.5rem' }} onClick={e => e.stopPropagation()}>
          <IconBtn title="Edit" onClick={() => navigate(`/edit/${id}`)}>
            <Icon.Edit />
          </IconBtn>
          <IconBtn danger title="Delete" onClick={() => onDelete(post)}>
            <Icon.Trash />
          </IconBtn>
        </div>
      </div>
    </article>
  )
}
