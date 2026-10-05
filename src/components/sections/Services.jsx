import { useState } from 'react'
import { CheckCircle2, Maximize2 } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Slider from '../ui/Slider'
import Modal from '../ui/Modal'
import { Icon } from '../ui/icons'
import { services, workProcess } from '../../data/services'
import { profile } from '../../data/profile'

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I Can Help"
      description="Practical automation, data and IoT work for engineering, manufacturing and small-business teams. Scoped clearly and delivered as working tools."
      tinted
    >
      <Slider label="services" slideClass="basis-[72%] sm:basis-[40%] lg:basis-[30%] xl:basis-[23.5%]">
        {services.map((service) => (
          <button
            key={service.title}
            type="button"
            onClick={() => setActive(service)}
            className="group flex h-full w-full flex-col rounded-xl border border-line bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-card"
          >
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-fg">
              <Icon name={service.icon} size={22} />
            </span>
            <h3 className="text-lg font-semibold text-fg">{service.title}</h3>
            <p className="mt-2 text-[0.95rem] text-muted">{service.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">
              View details <Maximize2 size={14} aria-hidden="true" />
            </span>
          </button>
        ))}
      </Slider>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="space-y-5">
            <p className="text-lg text-muted">{active.description}</p>
            <ul className="space-y-2">
              {active.examples.map((ex) => (
                <li key={ex} className="flex items-start gap-2 text-muted">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-primary" aria-hidden="true" />
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      {/* How engagements work */}
      <Reveal className="mt-8">
        <h3 className="mb-5 text-xl font-semibold text-fg">How a project works</h3>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((step) => (
            <li key={step.step} className="rounded-xl border border-line bg-surface p-5">
              <span className="font-mono text-sm text-primary">{step.step}</span>
              <p className="mt-1 font-semibold text-fg">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Engagement types + CTA */}
      <Reveal className="mt-8 grid items-center gap-8 rounded-2xl border border-line bg-surface p-6 md:p-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-2xl font-bold text-fg md:text-3xl">Have a repetitive technical or data problem?</p>
          <p className="mt-2 text-lg text-muted">Let&apos;s build a practical solution.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-fg">Available for</p>
          <ul className="flex flex-wrap gap-2">
            {profile.engagementTypes.map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
