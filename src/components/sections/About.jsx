import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import { profile } from '../../data/profile'
import { site } from '../../config/site'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineering first. Technology where it helps.">
      <div className="grid items-start gap-8 md:grid-cols-[11rem_1fr] lg:grid-cols-[13rem_1fr]">
        <Reveal delay={120} className="mx-auto w-40 md:w-full">
          {site.profilePhoto ? (
            <SmartImage src={site.profilePhoto} alt={`Portrait of ${site.name}`} aspect="aspect-[4/5]" />
          ) : (
            <div className="bg-grid flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-xl border border-line bg-surface-2">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-line-strong bg-surface text-2xl font-bold text-fg">NK</span>
              <span className="font-mono text-xs uppercase tracking-wider text-subtle">Profile photo</span>
            </div>
          )}
        </Reveal>

        <Reveal className="space-y-4 text-lg text-muted">
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-fg' : ''}>
              {p}
            </p>
          ))}
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-10">
        <dl className="grid divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3 [&>div]:border-line sm:[&>div]:border-b sm:[&>div:nth-last-child(-n+2)]:border-b-0 lg:[&>div:nth-last-child(3)]:border-b">
          {profile.aboutFacts.map((fact) => (
            <div key={fact.label} className="px-4 py-3">
              <dt className="font-mono text-[0.7rem] uppercase tracking-wider text-subtle">{fact.label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
