import { useNavigate } from 'react-router-dom'

/* ─── ICON HELPERS ─── */
export const Icon = {
  Home: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Plus: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Edit: () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: ({ size = 13 }) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  Back: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Clock: () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  User: () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Spinner: () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
      style={{ animation: 'spin 1s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
}

/* ─── NAVBAR ─── */
export function Navbar({ postCount }) {
  const navigate = useNavigate()
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(245,242,236,.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--rule)',
      padding: '0 clamp(1rem,5vw,4rem)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '64px',
    }}>
      <button onClick={() => navigate('/')} style={{
        display: 'flex', alignItems: 'baseline', gap: '.4rem',
        background: 'none', border: 'none', cursor: 'pointer',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.6rem', fontWeight: 900,
          color: 'var(--ink)', letterSpacing: '-.02em',
        }}>Inkwell</span>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: 'var(--accent)', marginBottom: '4px',
        }} />
      </button>

      <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '.35rem',
          fontFamily: "'DM Mono', monospace", fontSize: '.7rem',
          padding: '.25rem .6rem', borderRadius: '999px',
          border: '1px solid var(--rule)', color: 'var(--ink-muted)',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#22c55e', animation: 'pulse 2s infinite',
            display: 'inline-block',
          }} />
          {postCount !== null ? `${postCount} posts` : 'Connected'}
        </span>
        <Btn variant="ghost" icon={<Icon.Home />} onClick={() => navigate('/')}>Home</Btn>
        <Btn variant="primary" icon={<Icon.Plus />} onClick={() => navigate('/new')}>New Post</Btn>
      </div>
    </nav>
  )
}

/* ─── BUTTON ─── */
const btnStyles = {
  base: {
    display: 'inline-flex', alignItems: 'center', gap: '.45rem',
    fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem', fontWeight: 500,
    border: 'none', cursor: 'pointer', borderRadius: 'var(--r)',
    padding: '.55rem 1.1rem', transition: 'all .25s var(--ease)',
    textDecoration: 'none',
  },
  primary: { background: 'var(--ink)', color: 'var(--paper)' },
  ghost:   { background: 'transparent', color: 'var(--ink-soft)', border: '1px solid transparent' },
  accent:  { background: 'var(--accent)', color: '#fff' },
  danger:  { background: '#fee2e2', color: '#b91c1c' },
}

export function Btn({ variant = 'primary', icon, children, onClick, disabled, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...btnStyles.base, ...btnStyles[variant], opacity: disabled ? .65 : 1, ...style }}
    >
      {icon}{children}
    </button>
  )
}

/* ─── ICON BUTTON ─── */
export function IconBtn({ onClick, danger, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '30px', height: '30px', borderRadius: 'var(--r)',
        border: '1px solid var(--rule)', background: 'var(--card-bg)',
        cursor: 'pointer', color: danger ? '#b91c1c' : 'var(--ink-soft)',
        transition: 'all .2s var(--ease)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = danger ? '#fee2e2' : 'var(--cream)'
        if (danger) e.currentTarget.style.borderColor = '#fca5a5'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--card-bg)'
        e.currentTarget.style.borderColor = 'var(--rule)'
      }}
    >
      {children}
    </button>
  )
}

/* ─── CONFIRM MODAL ─── */
export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div
      onClick={e => e.target === e.currentTarget && onCancel()}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(15,14,12,.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', animation: 'fadeIn .2s ease',
      }}
    >
      <div style={{
        background: 'var(--card-bg)', borderRadius: '12px',
        padding: '2rem', maxWidth: '400px', width: '100%',
        boxShadow: 'var(--shadow-lg)', animation: 'modalUp .25s ease',
      }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontSize: '1.4rem',
          fontWeight: 700, marginBottom: '.5rem',
        }}>{title}</h3>
        <p style={{ color: 'var(--ink-muted)', fontWeight: 300, marginBottom: '1.5rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
          <Btn variant="ghost" onClick={onCancel}>Keep it</Btn>
          <Btn variant="danger" icon={<Icon.Trash />} onClick={onConfirm}>Yes, delete</Btn>
        </div>
      </div>
    </div>
  )
}

/* ─── SKELETON ─── */
export function Skeleton({ width = '100%', height = '12px', style = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--cream) 25%, var(--rule) 50%, var(--cream) 75%)',
      backgroundSize: '200% 100%',
      borderRadius: '4px',
      animation: 'shimmer 1.5s infinite',
      width, height, ...style,
    }} />
  )
}

/* ─── SKELETON CARD ─── */
export function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--rule)',
      borderRadius: '8px', padding: '1.5rem',
    }}>
      <Skeleton width="40%" height="10px" style={{ marginBottom: '14px' }} />
      <Skeleton width="85%" height="22px" style={{ marginBottom: '8px' }} />
      <Skeleton width="70%" height="22px" style={{ marginBottom: '18px' }} />
      <Skeleton width="100%" height="10px" style={{ marginBottom: '8px' }} />
      <Skeleton width="90%" height="10px" style={{ marginBottom: '8px' }} />
      <Skeleton width="75%" height="10px" />
    </div>
  )
}

/* ─── BACK BUTTON ─── */
export function BackButton({ onClick, label = 'Back' }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: '.4rem',
      fontSize: '.85rem', fontWeight: 500, color: 'var(--ink-muted)',
      background: 'none', border: 'none', cursor: 'pointer',
      marginBottom: '3rem', padding: 0, transition: 'color .2s',
    }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
    >
      <Icon.Back /> {label}
    </button>
  )
}

/* ─── EMPTY STATE ─── */
export function EmptyState({ icon = '✦', title, message, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--ink-muted)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: .4 }}>{icon}</div>
      <h3 style={{
        fontFamily: "'Playfair Display', serif", fontSize: '1.5rem',
        color: 'var(--ink-soft)', marginBottom: '.5rem',
      }}>{title}</h3>
      <p style={{ fontWeight: 300 }}>{message}</p>
      {action && <div style={{ marginTop: '1.5rem' }}>{action}</div>}
    </div>
  )
}
