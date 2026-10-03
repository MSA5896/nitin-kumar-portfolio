import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { posts } from '../data/blog'
import { usePageMeta } from '../hooks/usePageMeta'
import { matchesQuery } from '../utils/search'
import NoteCard from '../components/sections/NoteCard'

export default function Notes() {
  const [query, setQuery] = useState('')
  usePageMeta({
    title: 'Technical Notes',
    description: 'Technical notes by Nitin Kumar on AI automation in manufacturing, Python quality data analysis, Raspberry Pi monitoring and ROS2.',
  })

  const visible = useMemo(
    () => posts.filter((p) => matchesQuery(query, [p.title, p.summary, ...p.tags])),
    [query],
  )

  return (
    <div className="container-page py-14 md:py-20">
      <p className="eyebrow mb-3">Technical notes</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-fg md:text-5xl">Notes for engineers</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Practical writing on automation, quality data, IoT and robotics. Articles marked Draft are outlines that are still being written.
      </p>

      <label className="relative mt-8 block max-w-md">
        <span className="sr-only">Search notes</span>
        <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes"
          className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
        />
      </label>
      <p className="sr-only" aria-live="polite">
        {visible.length} notes shown
      </p>

      {visible.length ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <NoteCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-line-strong p-10 text-center text-muted">No notes match your search.</p>
      )}
    </div>
  )
}
