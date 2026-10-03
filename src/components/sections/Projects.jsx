import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import Section from '../ui/Section'
import ProjectCard from './ProjectCard'
import { projectFilters, projects } from '../../data/projects'
import { matchesQuery } from '../../utils/search'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === 'All' || p.filters.includes(filter)) &&
          matchesQuery(query, [p.title, p.summary, p.category, p.status, ...p.tags]),
      ),
    [filter, query],
  )

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Prototypes, portfolio projects and learning builds across quality analytics, automation, IoT and robotics. Each one is labelled with its real status."
    >
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter projects by category" className="-mx-1 flex flex-wrap gap-2">
          {projectFilters.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active ? 'border-primary bg-primary text-primary-fg' : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
        <label className="relative block w-full lg:w-72">
          <span className="sr-only">Search projects</span>
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects or technologies"
            className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-9 text-[0.95rem] text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-subtle hover:text-fg" aria-label="Clear search">
              <X size={15} aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} project{visible.length === 1 ? '' : 's'} shown
      </p>

      {visible.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug} className="animate-[fadeIn_0.35s_ease]">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-line-strong p-10 text-center text-muted">
          No projects match this filter.{' '}
          <button
            type="button"
            className="font-semibold text-primary hover:underline"
            onClick={() => {
              setFilter('All')
              setQuery('')
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </Section>
  )
}
