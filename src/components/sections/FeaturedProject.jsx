import { ArrowRight, Info } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { StatusBadge, Tag } from '../ui/Badges'
import FlowDiagram from '../diagrams/FlowDiagram'
import { projects } from '../../data/projects'

export default function FeaturedProject() {
  const project = projects.find((p) => p.featured)
  if (!project) return null

  return (
    <Section id="featured" eyebrow="Featured project" title={project.title} description={project.summary}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={project.status} />
            {project.product && <span className="font-mono text-sm text-muted">{project.product}</span>}
            {project.initiative && <span className="text-sm text-subtle">· {project.initiative}</span>}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-subtle">Problem</h3>
            <p className="text-muted">{project.problem}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-subtle">Monitored parameters</h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {project.parameters.map((p) => (
                <li key={p} className="rounded-lg border border-line bg-surface px-3 py-2 text-center text-sm font-medium text-fg">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>

          {project.disclaimer && (
            <p className="flex gap-2 rounded-lg border border-line bg-surface-2 p-3 text-sm text-muted">
              <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              {project.disclaimer}
            </p>
          )}

          <Button to={`/projects/${project.slug}`}>
            View project details <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </Reveal>

        <Reveal delay={120} className="space-y-4">
          <FlowDiagram steps={project.architecture} title="System architecture" compact />
        </Reveal>
      </div>
    </Section>
  )
}
