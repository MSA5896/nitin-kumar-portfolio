import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { isConfigured } from '../../utils/config'
import { sectionHref, useSectionNav } from '../../hooks/useSectionNav'
import { GithubIcon } from '../ui/icons'

const QUICK_LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  const goTo = useSectionNav()
  const year = new Date().getFullYear()
  const socialClass =
    'grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-primary hover:text-primary'

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-fg">{site.name}</p>
          <p className="mt-1 text-muted">{site.role}</p>
          <p className="font-mono text-sm text-subtle">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm text-muted">{site.availability}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-sm font-semibold text-fg">Quick links</p>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a href={sectionHref(id)} onClick={(e) => goTo(id, e)} className="text-muted transition-colors hover:text-primary">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/notes" className="text-muted transition-colors hover:text-primary">
                Technical Notes
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-semibold text-fg">Connect</p>
          <div className="flex gap-2">
            {isConfigured(site.github) && (
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="GitHub profile (opens in a new tab)">
                <GithubIcon />
              </a>
            )}
          </div>
          <p className="mt-4 text-sm text-subtle">{site.location}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-sm text-subtle">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
