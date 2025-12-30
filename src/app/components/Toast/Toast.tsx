import React, { useEffect } from 'react'

export interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onClose])

  const toastStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: 'var(--border-radius-default)',
    backgroundColor: type === 'success' ? 'var(--primary)' : 'var(--danger)',
    color: 'var(--text-color-reverse)',
    fontSize: 'var(--font-size-default)',
    fontFamily: 'var(--font-default)',
    lineHeight: 'var(--line-height-default)',
    zIndex: 10000,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    animation: 'slideIn 0.3s ease-out',
    maxWidth: '400px',
    wordWrap: 'break-word'
  }

  return (
    <div style={toastStyle} onClick={onClose}>
      {message}
    </div>
  )
}

export default Toast

