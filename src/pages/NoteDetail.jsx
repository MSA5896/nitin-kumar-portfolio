import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, PenLine } from 'lucide-react'
import { getPost } from '../data/blog'
import { usePageMeta } from '../hooks/usePageMeta'
import { StatusBadge, Tag } from '../components/ui/Badges'
import SmartImage from '../components/ui/SmartImage'
import NotFound from './NotFound'

export default function NoteDetail() {
  const { slug } = useParams()
  const post = getPost(slug)
  usePageMeta(post ? { title: post.title, description: post.summary } : { title: 'Note not found' })

  if (!post) return <NotFound />

  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <Link to="/notes" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary">
        <ArrowLeft size={16} aria-hidden="true" /> All notes
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={post.status} />
          <span className="font-mono text-xs text-subtle">{post.date || 'Not yet published'}</span>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-fg text-balance md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted">{post.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      </header>

      {post.status === 'Draft' && (
        <p className="mt-8 flex gap-2 rounded-lg border border-accent/40 bg-accent-soft p-4 text-sm text-fg">
          <PenLine size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          This article is a draft outline. The full write-up is in progress.
        </p>
      )}

      {post.image && <SmartImage src={post.image} alt={`${post.title} cover`} className="mt-8" />}

      <div className="mt-10 space-y-10">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-bold tracking-tight text-fg">{section.heading}</h2>
            {section.paragraphs?.map((p, i) => (
              <p key={i} className="mt-3 text-lg text-muted">
                {p}
              </p>
            ))}
            {section.points && (
              <ul className="mt-4 space-y-2">
                {section.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-lg text-muted">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  )
}
