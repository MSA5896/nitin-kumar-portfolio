import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import NoteCard from './NoteCard'
import { posts } from '../../data/blog'

export default function NotesPreview() {
  return (
    <Section
      id="notes"
      eyebrow="Technical notes"
      title="Writing on automation, data and IoT"
      description="Practical notes for engineers. Articles marked Draft are outlines that are still being written."
      tinted
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {posts.slice(0, 3).map((post, i) => (
          <Reveal as="li" key={post.slug} delay={i * 80}>
            <NoteCard post={post} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-8">
        <Button to="/notes" variant="secondary">
          All technical notes <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </Section>
  )
}
