import { profile } from '../../data/profile'
import { Icon } from '../ui/icons'
import Reveal from '../ui/Reveal'

export default function Stats() {
  return (
    <section aria-label="Highlights" className="border-b border-line bg-surface">
      <ul className="container-page grid grid-cols-1 gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <Reveal as="li" key={stat.title} delay={i * 80} className="flex gap-4 px-1 py-5 sm:px-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
              <Icon name={stat.icon} size={22} />
            </span>
            <div>
              <p className="font-semibold leading-snug text-fg">{stat.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{stat.detail}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
