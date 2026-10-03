import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ' +
  'disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap'

const variants = {
  primary: 'bg-primary text-primary-fg hover:bg-primary-hover hover:-translate-y-0.5 shadow-card',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-primary hover:text-primary hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-fg hover:bg-surface-2',
}

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-[0.95rem] px-4.5 py-2.5',
  lg: 'text-base px-6 py-3',
}

/**
 * One button for every case:
 *  - `to`   → internal route (react-router Link)
 *  - `href` → external / anchor link
 *  - neither → <button>
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', external, children, ...props }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    const ext = external ?? /^https?:/.test(href)
    return (
      <a href={href} className={classes} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
        {ext && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
