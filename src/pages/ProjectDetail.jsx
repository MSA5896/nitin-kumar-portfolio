import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, CircleDashed, ExternalLink, Info } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { StatusBadge, Tag } from '../components/ui/Badges'
import { GithubIcon } from '../components/ui/icons'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SmartImage from '../components/ui/SmartImage'
import FlowDiagram from '../components/diagrams/FlowDiagram'
import NotFound from './NotFound'
import { sectionHref, useSectionNav } from '../hooks/useSectionNav'

function Block({ title, children }) {
  return (
    <Reveal as="section" className="border-t border-line py-10 first:border-t-0">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-fg">{title}</h2>
      {children}
    </Reveal>
  )
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function ChipGrid({ items }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((i) => (
        <li key={i} className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-fg">
          {i}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const goTo = useSectionNav()
  usePageMeta(project ? { title: project.title, description: project.summary } : { title: 'Project not found' })

  if (!project) return <NotFound />

  const { links = {} } = project
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="container-page relative py-12 md:py-16">
          <Link to="/" state={{ section: 'projects' }} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-subtle">{project.category}</span>
            <StatusBadge status={project.status} />
            {project.product && <span className="font-mono text-sm text-muted">{project.product}</span>}
          </div>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-fg text-balance md:text-5xl">{project.title}</h1>
          {project.initiative && <p className="mt-2 text-muted">Initiative: {project.initiative}</p>}
          <p className="mt-5 max-w-3xl text-lg text-muted">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
          {(links.github || links.demo || links.docs) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.github && (
                <Button href={links.github} variant="secondary">
                  <GithubIcon size={17} /> GitHub
                </Button>
              )}
              {links.demo && (
                <Button href={links.demo}>
                  <ExternalLink size={17} aria-hidden="true" /> Live Demo
                </Button>
              )}
              {links.docs && (
                <Button href={links.docs} variant="secondary">
                  <BookOpen size={17} aria-hidden="true" /> Documentation
                </Button>
              )}
            </div>
          )}
          {project.disclaimer && (
            <p className="mt-8 flex max-w-3xl gap-2 rounded-lg border border-line bg-surface p-3 text-sm text-muted">
              <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              {project.disclaimer}
            </p>
          )}
        </div>
      </header>

      <div className="container-page py-10">
        <SmartImage src={project.image} alt={`${project.title}: ${project.imageIsIllustration ? 'illustration' : 'hero image'}`} label="Project hero image" aspect={project.image ? 'aspect-[21/9]' : 'aspect-[4/1]'} illustration={project.imageIsIllustration} eager />

        <div className="mx-auto max-w-4xl">
          <Block title="Problem">
            <p className="text-lg text-muted">{project.problem}</p>
          </Block>
          <Block title="Objective">
            <p className="text-lg text-muted">{project.objective}</p>
          </Block>
          <Block title="Solution">
            <p className="text-lg text-muted">{project.solution}</p>
            {project.parameters && (
              <div className="mt-6">
                <h3 className="mb-3 font-semibold text-fg">Monitored parameters</h3>
                <ChipGrid items={project.parameters} />
              </div>
            )}
            {project.analysis && (
              <div className="mt-6">
                <h3 className="mb-3 font-semibold text-fg">Analysis covered</h3>
                <ChipGrid items={project.analysis} />
              </div>
            )}
            {project.useCases && (
              <div className="mt-6">
                <h3 className="mb-3 font-semibold text-fg">Use cases</h3>
                <ChipGrid items={project.useCases} />
              </div>
            )}
            {project.behavior && (
              <div className="mt-6 overflow-x-auto">
                <h3 className="mb-3 font-semibold text-fg">System behaviour</h3>
                <table className="w-full min-w-[20rem] border-collapse overflow-hidden rounded-lg text-left text-sm">
                  <thead>
                    <tr className="bg-surface-2">
                      <th scope="col" className="border border-line px-4 py-2 font-semibold text-fg">Condition</th>
                      <th scope="col" className="border border-line px-4 py-2 font-semibold text-fg">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.behavior.map((row) => (
                      <tr key={row.condition}>
                        <td className="border border-line px-4 py-2 font-medium text-fg">{row.condition}</td>
                        <td className="border border-line px-4 py-2 text-muted">{row.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Block>
        </div>

        {/* Architecture uses the full width so the flow reads horizontally on desktop */}
        <Reveal as="section" className="border-t border-line py-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">Architecture</h2>
          <FlowDiagram steps={project.architecture} title="System flow" />
          {project.futureArchitecture && (
            <div className="mt-6">
              <FlowDiagram
                steps={project.futureArchitecture.steps}
                title={project.futureArchitecture.title}
                note={project.futureArchitecture.note}
                planned
              />
            </div>
          )}
        </Reveal>

        <div className="mx-auto max-w-4xl">
          <Block title="Technology">
            {project.components && (
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-fg">Components</h3>
                <ChipGrid items={project.components} />
              </div>
            )}
            <ChipGrid items={project.technology} />
          </Block>

          <Block title="Implementation">
            {project.progress ? (
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-xl border border-line bg-surface p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-fg">
                    <CheckCircle2 size={18} className="text-success" aria-hidden="true" /> Completed
                  </h3>
                  <BulletList items={project.progress.completed} />
                </div>
                <div className="rounded-xl border border-dashed border-line-strong p-5">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-fg">
                    <CircleDashed size={18} className="text-accent" aria-hidden="true" /> Learning / experimental
                  </h3>
                  <BulletList items={project.progress.learning} />
                </div>
              </div>
            ) : (
              <BulletList items={project.implementation} />
            )}
          </Block>

          <Block title="Screenshots">
            <ul className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((s, i) => (
                <li key={i}>
                  <figure>
                    <SmartImage src={s.src} alt={s.caption} label={s.caption} />
                    <figcaption className="mt-2 text-sm text-subtle">{s.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Results">
            <p className="rounded-lg border border-line bg-surface p-4 text-muted">{project.results}</p>
          </Block>

          <Block title="Challenges">
            <BulletList items={project.challenges} />
          </Block>

          <Block title="Future development">
            <BulletList items={project.future} />
          </Block>

          {/* Footer navigation */}
          <div className="mt-6 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Button href={sectionHref('contact')} onClick={(e) => goTo('contact', e)}>
              Discuss a similar project
            </Button>
            <Link to={`/projects/${next.slug}`} className="group inline-flex items-center gap-2 text-right font-medium text-muted hover:text-primary">
              <span>
                <span className="block text-xs uppercase tracking-wider text-subtle">Next project</span>
                {next.title}
              </span>
              <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
