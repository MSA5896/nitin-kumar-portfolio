import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/** Accessible full-detail dialog: Esc / backdrop click / close button to dismiss, page scroll locked while open. */
export default function Modal({ open, onClose, title, children }) {
  const panel = useRef(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      prev?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-3 backdrop-blur-sm sm:p-6 animate-[fadeIn_0.2s_ease]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card outline-none">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <h3 className="text-xl font-semibold text-fg">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-fg" aria-label="Close details">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto p-5 md:p-7">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
