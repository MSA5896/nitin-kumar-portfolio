import Section from '../ui/Section'
import Slider from '../ui/Slider'
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
      <Slider label="proficiency levels" slideClass="basis-[85%] sm:basis-[48%] lg:basis-[32%]">
        {proficiencyTiers.map((tier) => (
          <div key={tier.id} className="h-full rounded-xl border border-line bg-surface p-3.5">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${TIER_STYLES[tier.id].dot}`} aria-hidden="true" />
              <h3 className="font-semibold text-fg">{tier.title}</h3>
            </div>
            <p className="mt-0.5 text-xs text-subtle">{tier.description}</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {tier.skills.map((s) => (
                <li key={s} className={`rounded-md border px-2 py-0.5 text-xs font-medium ${TIER_STYLES[tier.id].chip}`}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Slider>

      {/* Detailed categories */}
      <div className="mt-3">
      <Slider label="skill categories" slideClass="basis-[88%] sm:basis-[62%] lg:basis-[40%]">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="h-full rounded-xl border border-line bg-surface p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-soft text-primary">
                <Icon name={cat.icon} size={15} />
              </span>
              <h3 className="text-base font-semibold text-fg">{cat.title}</h3>
            </div>
            {cat.note && <p className="mb-2 text-xs text-subtle">{cat.note}</p>}
            <ul className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <li key={item.name} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs text-fg">
                  <LevelDot level={item.level} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Slider>
      </div>

      <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-xs text-subtle" aria-label="Legend">
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
