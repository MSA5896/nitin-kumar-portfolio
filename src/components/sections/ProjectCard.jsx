import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { StatusBadge, Tag } from '../ui/Badges'
import { GithubIcon } from '../ui/icons'
import SmartImage from '../ui/SmartImage'

const linkClass =
  'relative z-10 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-fg'

/** Project card. GitHub / Live Demo buttons render only when links exist. */
export default function ProjectCard({ project }) {
  const { slug, featured, title, category, summary, tags, status, links = {}, image, imageIsIllustration } = project

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card">
      <SmartImage src={image} alt={imageIsIllustration ? `${title}: illustration` : `${title} preview`} label={category} illustration={imageIsIllustration} className="rounded-none border-0 border-b" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-subtle">
            {featured && <span className="mr-2 rounded bg-primary px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary-fg">FEATURED</span>}
            {category}
          </span>
          <StatusBadge status={status} />
        </div>
        <h3 className="text-lg font-semibold leading-snug text-fg">
          {/* Stretched link makes the whole card clickable while keeping one accessible link name */}
          <Link to={`/projects/${slug}`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-primary">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.95rem] text-muted">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {tags.slice(0, 5).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
          {tags.length > 5 && (
            <li>
              <Tag>+{tags.length - 5}</Tag>
            </li>
          )}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-1 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            View Project <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span className="ml-auto flex gap-1">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${title} on GitHub (opens in a new tab)`}>
                <GithubIcon size={15} /> GitHub
              </a>
            )}
            {links.demo && (
              <a href={links.demo} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${title} live demo (opens in a new tab)`}>
                <ExternalLink size={15} aria-hidden="true" /> Live Demo
              </a>
            )}
          </span>
        </div>
      </div>
    </article>
  )
}
