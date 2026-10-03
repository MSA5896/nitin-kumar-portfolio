import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyButton({ value, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* Clipboard unavailable (e.g. insecure context) — fail silently. */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary ${className}`}
      aria-label={copied ? 'Copied' : `${label}: ${value}`}
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : label}</span>
    </button>
  )
}
