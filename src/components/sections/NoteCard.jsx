import { Link } from 'react-router-dom'
import { StatusBadge, Tag } from '../ui/Badges'

export default function NoteCard({ post }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-subtle">{post.date || 'Upcoming'}</span>
        <StatusBadge status={post.status} />
      </div>
      <h3 className="font-semibold leading-snug text-fg group-hover:text-primary">
        <Link to={`/notes/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted">{post.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <li key={t}>
            <Tag>{t}</Tag>
          </li>
        ))}
      </ul>
    </article>
  )
}
