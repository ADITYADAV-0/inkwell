import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

let id = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg, type = 'info', duration = 3500) => {
    const key = ++id
    setToasts(t => [...t, { key, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.key !== key)), duration)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

const icons = {
  success: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

const toastColors = {
  success: { background: '#dcfce7', color: '#15803d' },
  error:   { background: '#fee2e2', color: '#b91c1c' },
  info:    { background: 'var(--ink)', color: 'var(--paper)' },
}

function ToastContainer({ toasts }) {
  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem',
      zIndex: 9000, display: 'flex', flexDirection: 'column', gap: '.5rem',
    }}>
      {toasts.map(t => (
        <div key={t.key} style={{
          display: 'flex', alignItems: 'center', gap: '.75rem',
          padding: '.875rem 1.25rem', borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)', fontSize: '.875rem', fontWeight: 500,
          animation: 'toastIn .3s ease', maxWidth: '320px',
          ...toastColors[t.type],
        }}>
          {icons[t.type]}
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
