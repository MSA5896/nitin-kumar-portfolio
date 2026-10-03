import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { Icon } from '../ui/icons'
import { levelLabels, proficiencyTiers, skillCategories } from '../../data/skills'

const TIER_STYLES = {
  professional: { dot: 'bg-success', chip: 'border-success/30 bg-success-soft text-success' },
  working: { dot: 'bg-primary', chip: 'border-primary/30 bg-primary-soft text-primary' },
  developing: { dot: 'bg-accent', chip: 'border-accent/30 bg-accent-soft text-accent' },
}

function LevelDot({ level }) {
  if (!level) return null
  return (
    <>
      <span className={`h-1.5 w-1.5 rounded-full ${TIER_STYLES[level].dot}`} aria-hidden="true" />
      <span className="sr-only"> ({levelLabels[level]})</span>
    </>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Capabilities, described honestly"
      description="Grouped by how I actually use them, from daily professional work to areas I am actively developing."
    >
      {/* Proficiency tiers */}
      <div className="grid gap-4 md:grid-cols-3">
        {proficiencyTiers.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 90} className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${TIER_STYLES[tier.id].dot}`} aria-hidden="true" />
              <h3 className="font-semibold text-fg">{tier.title}</h3>
            </div>
            <p className="mt-1 text-sm text-subtle">{tier.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tier.skills.map((s) => (
                <li key={s} className={`rounded-md border px-2.5 py-1 text-sm font-medium ${TIER_STYLES[tier.id].chip}`}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* Detailed categories */}
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.id} delay={(i % 2) * 90} className={`rounded-xl border border-line bg-surface p-6 ${cat.id === 'quality' ? 'lg:col-span-2' : ''}`}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                <Icon name={cat.icon} size={18} />
              </span>
              <h3 className="text-lg font-semibold text-fg">{cat.title}</h3>
            </div>
            {cat.note && <p className="-mt-1 mb-4 text-sm text-subtle">{cat.note}</p>}
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li key={item.name} className="inline-flex items-center gap-2 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm text-fg">
                  <LevelDot level={item.level} />
                  {item.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle" aria-label="Legend">
        {Object.entries(levelLabels).map(([key, label]) => (
          <li key={key} className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${TIER_STYLES[key].dot}`} aria-hidden="true" />
            {label}
          </li>
        ))}
        <li className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-line-strong" aria-hidden="true" />
          Domain knowledge
        </li>
      </ul>
    </Section>
  )
}
