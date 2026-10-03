import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import { profile } from '../../data/profile'
import { site } from '../../config/site'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineering first. Technology where it helps.">
      <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
        <Reveal className="space-y-5 text-lg text-muted">
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-fg' : ''}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120} className="space-y-6">
          {site.profilePhoto ? (
            <SmartImage src={site.profilePhoto} alt={`Portrait of ${site.name}`} aspect="aspect-[4/5]" />
          ) : (
            <div className="bg-grid flex aspect-[4/5] max-h-80 w-full flex-col items-center justify-center gap-3 rounded-xl border border-line bg-surface-2">
              <span className="grid h-24 w-24 place-items-center rounded-full border border-line-strong bg-surface text-3xl font-bold text-fg">NK</span>
              <span className="font-mono text-xs uppercase tracking-wider text-subtle">Profile photo</span>
            </div>
          )}
          <dl className="divide-y divide-line rounded-xl border border-line bg-surface">
            {profile.aboutFacts.map((fact) => (
              <div key={fact.label} className="px-4 py-3">
                <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle">{fact.label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
