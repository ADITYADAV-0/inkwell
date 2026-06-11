import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/PostCard'
import { SkeletonCard, EmptyState, Btn, Icon, ConfirmModal } from '../components/UI'

export default function Home() {
  const navigate = useNavigate()
  const { posts, loading, error, fetchPosts, deletePost } = usePosts()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = posts.filter(p => {
    const q = search.toLowerCase()
    return (
      (p.title || '').toLowerCase().includes(q) ||
      (p.summary || '').toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q)
    )
  })

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deletePost(deleteTarget._id)
    setDeleteTarget(null)
  }

  return (
    <div style={{ animation: 'fadeUp .4s ease' }}>

      {/* ─── HERO ─── */}
      <section style={{
        padding: 'clamp(3rem,8vw,7rem) clamp(1rem,5vw,4rem) 3rem',
        display: 'grid', gridTemplateColumns: '1fr auto',
        alignItems: 'end', gap: '2rem',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: '.78rem', fontWeight: 500,
            letterSpacing: '.14em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '.75rem',
            display: 'flex', alignItems: 'center', gap: '.5rem',
          }}>
            <span style={{ width: '28px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            Your personal journal
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem,6vw,5rem)', lineHeight: 1.05,
            fontWeight: 900, letterSpacing: '-.03em',
          }}>
            Where ideas<br />
            find their <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>voice.</em>
          </h1>
          <p style={{
            marginTop: '1rem', color: 'var(--ink-muted)', fontSize: '1.05rem',
            maxWidth: '480px', fontWeight: 300,
          }}>
            Write, publish, and share stories that matter. Beautiful, distraction-free blogging.
          </p>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '4rem', fontWeight: 900, lineHeight: 1, color: 'var(--ink)',
          }}>
            {loading ? '—' : posts.length}
          </div>
          <div style={{
            fontSize: '.8rem', color: 'var(--ink-muted)',
            letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            Published Posts
          </div>
        </div>
      </section>

      {/* ─── POSTS SECTION ─── */}
      <section style={{ padding: '3rem clamp(1rem,5vw,4rem) 5rem' }}>
        {/* Section header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '.75rem',
          }}>
            All Stories
            <span style={{ width: '40px', height: '1px', background: 'var(--rule)', display: 'inline-block' }} />
          </h2>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '.75rem', color: 'var(--ink-muted)', pointerEvents: 'none' }}>
              <Icon.Search />
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts…"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem',
                background: 'var(--card-bg)', border: '1px solid var(--rule)',
                borderRadius: '999px', padding: '.5rem 1rem .5rem 2.25rem',
                color: 'var(--ink)', outline: 'none', width: '220px',
                transition: 'all .25s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--ink)'; e.target.style.width = '280px' }}
              onBlur={e => { e.target.style.borderColor = 'var(--rule)'; e.target.style.width = '220px' }}
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '1.5rem' }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <EmptyState
            icon="⚡"
            title="Cannot reach server"
            message={error}
            action={<Btn variant="primary" onClick={fetchPosts}>Retry</Btn>}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={search ? 'No results found' : 'No posts yet'}
            message={search ? `Nothing matched "${search}"` : 'Your story starts here — write your first post.'}
            action={!search && (
              <Btn variant="accent" icon={<Icon.Plus />} onClick={() => navigate('/new')}>
                Write your first post
              </Btn>
            )}
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map(post => (
              <PostCard key={post._id} post={post} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid var(--rule)',
        padding: '2rem clamp(1rem,5vw,4rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        color: 'var(--ink-muted)', fontSize: '.825rem',
      }}>
        <div>Built with <strong style={{ color: 'var(--ink)' }}>Inkwell</strong> — A Modern Blogging Platform</div>
        <div>Created by Aditya Yadav</div>
      </footer>

      {/* ─── DELETE MODAL ─── */}
      {deleteTarget && (
        <ConfirmModal
          title="Delete this post?"
          message="This action cannot be undone. The story will be permanently removed from your blog."
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
