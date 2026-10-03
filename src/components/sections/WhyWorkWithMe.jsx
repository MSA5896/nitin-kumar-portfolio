import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import { Icon } from '../ui/icons'
import { profile } from '../../data/profile'

export default function WhyWorkWithMe() {
  return (
    <Section
      id="why"
      eyebrow="Why work with me"
      title="Engineering judgement, not just code"
      description="The combination that sets my work apart: manufacturing and quality experience, applied with AI, data, IoT and robotics."
      tinted
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.whyWorkWithMe.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            delay={(i % 4) * 70}
            className={`rounded-xl border border-line bg-surface p-5 ${i === profile.whyWorkWithMe.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <Icon name={item.icon} size={22} className="text-primary" />
            <h3 className="mt-3 font-semibold text-fg">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{item.text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
