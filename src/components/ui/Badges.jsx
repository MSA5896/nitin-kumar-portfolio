export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.75rem] text-muted ${className}`}
    >
      {children}
    </span>
  )
}

const STATUS_STYLES = {
  Prototype: 'bg-primary-soft text-primary',
  'In Development': 'bg-accent-soft text-accent',
  'Portfolio Project': 'bg-success-soft text-success',
  'Learning Project': 'bg-violet-soft text-violet',
  Concept: 'bg-surface-2 text-muted',
  Draft: 'bg-accent-soft text-accent',
  Published: 'bg-success-soft text-success',
}

export function StatusBadge({ status, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status] || STATUS_STYLES.Concept} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  )
}
