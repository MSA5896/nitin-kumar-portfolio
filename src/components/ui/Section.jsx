import Reveal from './Reveal'

export function SectionHeader({ eyebrow, title, description, align = 'left', id }) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-10 md:mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl md:text-4xl font-bold tracking-tight text-fg text-balance">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted text-pretty">{description}</p>}
    </Reveal>
  )
}

/** Standard page section with consistent spacing and an accessible heading label. */
export default function Section({ id, eyebrow, title, description, align, className = '', tinted = false, children }) {
  const headingId = id ? `${id}-heading` : undefined
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`py-20 md:py-28 ${tinted ? 'bg-surface-2/50 border-y border-line' : ''} ${className}`}
    >
      <div className="container-page">
        {title && <SectionHeader id={headingId} eyebrow={eyebrow} title={title} description={description} align={align} />}
        {children}
      </div>
    </section>
  )
}
