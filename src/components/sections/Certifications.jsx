import { useState } from 'react'
import { Award, ExternalLink, Maximize2 } from 'lucide-react'
import Section from '../ui/Section'
import Slider from '../ui/Slider'
import Modal from '../ui/Modal'
import { certifications } from '../../data/certifications'
import { asset } from '../../utils/config'

const PLACEHOLDERS = Array.from({ length: 3 }, () => ({
  name: 'Certification Name',
  issuer: 'Issuing Organization',
  year: 'Year',
}))

const linkClass =
  'inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-medium text-primary hover:bg-surface-2'

/**
 * Slider of certificates from src/data/certifications.js; click a card for full details.
 * While the list is empty: placeholders in development, hidden in production.
 */
export default function Certifications() {
  const [active, setActive] = useState(null)
  const isEmpty = certifications.length === 0
  if (isEmpty && !import.meta.env.DEV) return null
  const items = isEmpty ? PLACEHOLDERS : certifications
  const images = active ? [active.image && { label: 'Certificate', src: active.image }, ...(active.extraImages || [])].filter(Boolean) : []

  return (
    <Section id="certifications" eyebrow="Certifications" title="Certifications & courses" description="Slide through my certificates and click any card to see it in full.">
      {isEmpty && (
        <p className="mb-6 rounded-lg border border-dashed border-accent bg-accent-soft p-3 text-sm text-accent">
          Dev only: placeholders. Add real certificates in src/data/certifications.js. This section is hidden on the live site until then.
        </p>
      )}
      <Slider label="certificates">
        {items.map((c, i) => (
          <button
            key={`${c.name}-${i}`}
            type="button"
            disabled={isEmpty}
            onClick={() => setActive(c)}
            className={`group flex h-full w-full flex-col gap-3 rounded-xl border bg-surface p-5 text-left transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-card ${isEmpty ? 'border-dashed border-line-strong' : 'border-line'}`}
          >
            <div className="flex items-start gap-4">
              <Award size={24} className="shrink-0 text-primary" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-semibold text-fg">{c.name}</p>
                <p className="line-clamp-2 text-sm text-muted">{c.issuer}</p>
                <p className="font-mono text-xs text-subtle">{c.year}</p>
              </div>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View details <Maximize2 size={14} aria-hidden="true" />
            </span>
          </button>
        ))}
      </Slider>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.name}>
        {active && (
          <div className="space-y-5">
            <p className="text-muted">{active.issuer}</p>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-subtle">Date</dt>
                <dd className="font-medium text-fg">{active.year}</dd>
              </div>
              {active.credentialId && (
                <div>
                  <dt className="text-subtle">Credential / Certificate ID</dt>
                  <dd className="font-mono text-fg">{active.credentialId}</dd>
                </div>
              )}
              {active.skills && (
                <div className="sm:col-span-2">
                  <dt className="text-subtle">Skills</dt>
                  <dd className="text-fg">{active.skills}</dd>
                </div>
              )}
            </dl>
            {images.map((img) => (
              <figure key={img.src}>
                <img src={asset(img.src)} alt={`${active.name}: ${img.label}`} className="mx-auto w-full max-w-xl rounded-lg border border-line" />
                <figcaption className="mt-1 text-center text-xs text-subtle">{img.label}</figcaption>
              </figure>
            ))}
            <div className="flex flex-wrap gap-3">
              {active.credentialUrl && (
                <a href={active.credentialUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  View credential <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
