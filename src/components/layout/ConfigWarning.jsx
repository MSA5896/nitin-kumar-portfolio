import { useState } from 'react'
import { site } from '../../config/site'
import { isConfigured } from '../../utils/config'
import { useResumeAvailable } from '../../hooks/useResumeAvailable'

/** Development-only banner listing missing configuration. Never rendered in production builds. */
export default function ConfigWarning() {
  const [hidden, setHidden] = useState(false)
  const resumeAvailable = useResumeAvailable()

  const missing = [
    !isConfigured(site.email) && 'email (src/config/site.js)',
    !isConfigured(site.github) && 'github URL (src/config/site.js)',
    !isConfigured(site.whatsapp) && 'WhatsApp number (optional, src/config/site.js)',
    !isConfigured(site.url) && 'website URL (site.js, index.html, robots.txt, sitemap.xml)',
    resumeAvailable === false && 'resume PDF (public/resume.pdf)',
  ].filter(Boolean)

  if (hidden || missing.length === 0) return null

  return (
    <div role="status" className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-xl rounded-xl border border-accent bg-surface p-4 text-sm shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-accent">Dev only: configuration needed</p>
          <ul className="mt-1 list-disc pl-5 text-muted">
            {missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-subtle">Visitors never see this. Related buttons are hidden until configured.</p>
        </div>
        <button type="button" onClick={() => setHidden(true)} className="rounded-md px-2 py-1 text-xs text-muted hover:bg-surface-2" aria-label="Dismiss configuration warning">
          Dismiss
        </button>
      </div>
    </div>
  )
}
