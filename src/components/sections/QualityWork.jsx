import { ClipboardCheck, FileText, Info, Users } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import { Tag } from '../ui/Badges'
import { auditExperience, dashboards, departments, documentGroups, npdStages, standards } from '../../data/qualityWork'

export default function QualityWork() {
  return (
    <Section
      id="quality-work"
      eyebrow="Quality documentation & dashboards"
      title="Quality systems, documents and dashboards"
      description="Working across quality, production and R&D teams, preparing the documentation that runs a quality system, and turning inspection and production data into dashboards people can act on."
    >
      <Reveal className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-fg">Cross-functional teams &amp; compliance</h3>
        <p className="mt-2 max-w-3xl text-muted">
          Close working experience with the departments around a quality system, and with the regulations, standards and audits that govern it.
        </p>
      </Reveal>

      <div className="mb-14 grid gap-5 lg:grid-cols-3">
        <Reveal className="rounded-xl border border-line bg-surface p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <Users size={18} aria-hidden="true" />
            </span>
            <h4 className="font-semibold text-fg">Departments worked with</h4>
          </div>
          <ul className="grid grid-cols-2 gap-2">
            {departments.map((d) => (
              <li key={d.name} className="rounded-lg border border-line bg-surface-2 px-3 py-2">
                <span className="block text-sm font-semibold text-fg">{d.name}</span>
                {d.full && <span className="block text-xs text-muted">{d.full}</span>}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80} className="rounded-xl border border-line bg-surface p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <FileText size={18} aria-hidden="true" />
            </span>
            <h4 className="font-semibold text-fg">Standards &amp; regulations</h4>
          </div>
          <ul className="space-y-3">
            {standards.map((s) => (
              <li key={s.code} className="border-l-2 border-primary pl-3">
                <span className="block font-semibold text-fg">{s.code}</span>
                <span className="block text-sm text-muted">{s.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160} className="rounded-xl border border-line bg-surface p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-success-soft text-success">
              <ClipboardCheck size={18} aria-hidden="true" />
            </span>
            <h4 className="font-semibold text-fg">{auditExperience.title}</h4>
          </div>
          <p className="text-muted">{auditExperience.text}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            <li className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-muted">Internal audits</li>
            <li className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-muted">External audits</li>
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

      <Reveal className="mb-6 mt-14">
        <h3 className="text-2xl font-bold tracking-tight text-fg">Documentation across the product lifecycle</h3>
        <p className="mt-2 max-w-3xl text-muted">
          Working on the complete quality documentation flow, from the start of a product to its ongoing maintenance, in line with CDSCO requirements and ISO 13485. Organised by new product development (NPD) stage.
        </p>
      </Reveal>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {npdStages.map((stage, i) => (
          <Reveal as="li" key={stage.title} delay={(i % 3) * 70} className="rounded-xl border border-line bg-surface p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary-soft font-mono text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-semibold text-fg">{stage.title}</h4>
            </div>
            <ul className="space-y-1.5">
              {stage.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mb-6 mt-14">
        <h3 className="text-2xl font-bold tracking-tight text-fg">Analytics dashboards</h3>
        <p className="mt-2 flex gap-2 text-sm text-muted">
          <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          Images are illustrative layouts with placeholder shapes. They do not show real company data.
        </p>
      </Reveal>

      <ul className="grid gap-5 md:grid-cols-2">
        {dashboards.map((d, i) => (
          <Reveal as="li" key={d.title} delay={(i % 2) * 80} className="overflow-hidden rounded-xl border border-line bg-surface">
            <SmartImage
              src={d.image}
              alt={`${d.title}: illustrative layout`}
              label={d.title}
              illustration={d.illustration}
              className="rounded-none border-0 border-b"
            />
            <div className="p-5">
              <h4 className="font-semibold text-fg">{d.title}</h4>
              <p className="mt-1.5 text-sm text-muted">{d.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Focus areas">
                {d.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
