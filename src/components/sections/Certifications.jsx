import { Award, ExternalLink } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { certifications } from '../../data/certifications'

const PLACEHOLDERS = Array.from({ length: 3 }, () => ({
  name: 'Certification Name',
  issuer: 'Issuing Organization',
  year: 'Year',
}))

/**
 * Lists real certificates from src/data/certifications.js.
 * While the list is empty: placeholders in development, hidden in production.
 */
export default function Certifications() {
  const isEmpty = certifications.length === 0
  if (isEmpty && !import.meta.env.DEV) return null
  const items = isEmpty ? PLACEHOLDERS : certifications

  return (
    <Section id="certifications" eyebrow="Certifications" title="Certifications & courses">
      {isEmpty && (
        <p className="mb-6 rounded-lg border border-dashed border-accent bg-accent-soft p-3 text-sm text-accent">
          Dev only: placeholders. Add real certificates in src/data/certifications.js. This section is hidden on the live site until then.
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <Reveal as="li" key={`${c.name}-${i}`} delay={i * 70} className={`flex gap-4 rounded-xl border bg-surface p-5 ${isEmpty ? 'border-dashed border-line-strong' : 'border-line'}`}>
            <Award size={24} className="shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-semibold text-fg">{c.name}</p>
              <p className="text-sm text-muted">{c.issuer}</p>
              <p className="font-mono text-xs text-subtle">{c.year}</p>
              {c.credentialId && (
                <p className="mt-1 font-mono text-xs text-subtle">Credential ID: {c.credentialId}</p>
              )}
              {c.skills && <p className="mt-1 text-sm text-muted">Skills: {c.skills}</p>}
              {c.credentialUrl && (
                <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  View credential <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
