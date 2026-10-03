import { Link } from 'react-router-dom'
import { BookOpen, ExternalLink, FolderGit2 } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { StatusBadge } from '../ui/Badges'
import { GithubIcon } from '../ui/icons'
import { projects } from '../../data/projects'
import { site } from '../../config/site'
import { isConfigured } from '../../utils/config'

const linkClass = 'inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary'

export default function GitHubSection() {
  const hasProfile = isConfigured(site.github)

  return (
    <Section
      id="code"
      eyebrow="Code"
      title="Repositories & documentation"
      description="Source code, demos and documentation for each project are linked here as they are published."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const { github, demo, docs } = p.links || {}
          const hasAny = github || demo || docs
          return (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 70} className="flex flex-col rounded-xl border border-line bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <FolderGit2 size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <StatusBadge status={p.status} />
              </div>
              <Link to={`/projects/${p.slug}`} className="mt-3 font-mono text-[0.95rem] font-medium text-fg hover:text-primary">
                {p.slug}
              </Link>
              <p className="mt-1 flex-1 text-sm text-muted">{p.title}</p>
              <div className="mt-4 flex flex-wrap gap-4 border-t border-line pt-3">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <GithubIcon size={15} /> GitHub
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <ExternalLink size={15} aria-hidden="true" /> Live Demo
                  </a>
                )}
                {docs && (
                  <a href={docs} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <BookOpen size={15} aria-hidden="true" /> Docs
                  </a>
                )}
                {!hasAny && <span className="text-sm text-subtle">Repository not yet public</span>}
              </div>
            </Reveal>
          )
        })}
      </ul>
      {hasProfile && (
        <div className="mt-8">
          <Button href={site.github} variant="secondary">
            <GithubIcon size={18} /> View GitHub profile
          </Button>
        </div>
      )}
    </Section>
  )
}
