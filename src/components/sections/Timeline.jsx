import { timeline } from '../../data/experience'
import { useInView } from '../../hooks/useInView'
import Reveal from '../ui/Reveal'

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <div ref={ref} className={`relative ${inView ? 'is-visible' : ''}`}>
      <span className="timeline-line absolute bottom-2 left-[7px] top-2 w-px bg-line-strong" aria-hidden="true" />
      <ol className="space-y-8">
        {timeline.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 140} className="relative pl-9">
            <span
              className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                item.current ? 'border-success bg-success-soft' : 'border-primary bg-bg'
              }`}
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-primary">{item.label}</p>
            <p className="mt-1 font-semibold text-fg">{item.title}</p>
            <p className="text-sm text-subtle">{item.org}</p>
            <p className="mt-1.5 text-sm text-muted">{item.text}</p>
            {item.chips && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.chips.map((c) => (
                  <li key={c} className="rounded-md bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
