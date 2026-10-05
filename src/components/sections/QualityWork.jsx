import { useState } from 'react'
import { ClipboardCheck, FileText, Info, Maximize2, Users } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Slider from '../ui/Slider'
import Modal from '../ui/Modal'
import SmartImage from '../ui/SmartImage'
import { Tag } from '../ui/Badges'
import { auditExperience, dashboards, departments, documentGroups, npdStages, standards } from '../../data/qualityWork'

export default function QualityWork() {
  const [active, setActive] = useState(null)
  return (
    <Section
      id="quality-work"
      eyebrow="Quality documentation & dashboards"
      title="Quality systems, documents and dashboards"
      description="Working across quality, production and R&D teams, preparing the documentation that runs a quality system, and turning inspection and production data into dashboards people can act on."
    >
      <Reveal className="mb-4">
        <h3 className="text-2xl font-bold tracking-tight text-fg">Cross-functional teams &amp; compliance</h3>
        <p className="mt-1 max-w-4xl text-sm text-muted">
          Close working experience with the departments around a quality system, and with the regulations, standards and audits that govern it.
        </p>
      </Reveal>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.1fr_1.4fr_1fr]">
        <Reveal className="rounded-xl border border-line bg-surface p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-soft text-primary">
              <Users size={15} aria-hidden="true" />
            </span>
            <h4 className="text-sm font-semibold text-fg">Departments worked with</h4>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {departments.map((d) => (
              <li key={d.name} title={d.full} className="rounded-md border border-line bg-surface-2 px-2 py-1 text-xs leading-tight">
                <span className="font-semibold text-fg">{d.name}</span>
                {d.full && <span className="ml-1 text-muted">{d.full}</span>}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="rounded-xl border border-line bg-surface p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary-soft text-primary">
              <FileText size={15} aria-hidden="true" />
            </span>
            <h4 className="text-sm font-semibold text-fg">Standards &amp; regulations</h4>
          </div>
          <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
            {standards.map((s) => (
              <li key={s.code} className="border-l-2 border-primary pl-2 leading-tight">
                <span className="block text-sm font-semibold text-fg">{s.code}</span>
                <span className="block text-xs text-muted">{s.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160} className="rounded-xl border border-line bg-surface p-3.5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-success-soft text-success">
              <ClipboardCheck size={15} aria-hidden="true" />
            </span>
            <h4 className="text-sm font-semibold text-fg">{auditExperience.title}</h4>
          </div>
          <p className="text-xs leading-relaxed text-muted">{auditExperience.text}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            <li className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-xs text-muted">Internal audits</li>
            <li className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-xs text-muted">External audits</li>
          </ul>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {documentGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 80} className="rounded-xl border border-line bg-surface p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                <FileText size={18} aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-fg">{group.title}</h3>
            </div>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-5 mt-8">
        <h3 className="text-2xl font-bold tracking-tight text-fg">Documentation across the product lifecycle</h3>
        <p className="mt-1 max-w-4xl text-sm text-muted">
          Working on the complete quality documentation flow, from the start of a product to its ongoing maintenance, in line with CDSCO requirements and ISO 13485. Organised by new product development (NPD) stage.
        </p>
      </Reveal>

      <Slider label="lifecycle stages" slideClass="basis-[72%] sm:basis-[40%] lg:basis-[26%] xl:basis-[21%]">
        {npdStages.map((stage, i) => (
          <div key={stage.title} className="h-full rounded-xl border border-line bg-surface p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-primary-soft font-mono text-xs font-semibold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="text-sm font-semibold text-fg">{stage.title}</h4>
            </div>
            <ul className="space-y-1">
              {stage.items.map((item) => (
                <li key={item} className="flex gap-1.5 text-xs leading-snug text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Slider>

      <Reveal className="mb-5 mt-8">
        <h3 className="text-2xl font-bold tracking-tight text-fg">Analytics dashboards</h3>
        <p className="mt-2 flex gap-2 text-sm text-muted">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          Images are illustrative layouts with placeholder shapes. They do not show real company data.
        </p>
      </Reveal>

      <Slider label="dashboards" slideClass="basis-[70%] sm:basis-[38%] lg:basis-[28%] xl:basis-[22%]">
        {dashboards.map((d) => (
          <button
            key={d.title}
            type="button"
            onClick={() => setActive(d)}
            className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface text-left transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-card"
          >
            <SmartImage
              src={d.image}
              alt={`${d.title}: illustrative layout`}
              label={d.title}
              illustration={d.illustration}
              aspect="aspect-[16/9]"
              className="rounded-none border-0 border-b"
            />
            <div className="flex flex-1 flex-col p-3">
              <h4 className="text-sm font-semibold text-fg">{d.title}</h4>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-primary">
                View details <Maximize2 size={12} aria-hidden="true" />
              </span>
            </div>
          </button>
        ))}
      </Slider>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="space-y-4">
            <SmartImage src={active.image} alt={`${active.title}: illustrative layout`} label={active.title} illustration={active.illustration} />
            <p className="text-muted">{active.description}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
              {active.tags.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </Section>
  )
}
