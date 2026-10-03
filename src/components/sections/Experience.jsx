import { Award, Briefcase, CheckCircle2, GraduationCap, MapPin } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Timeline from './Timeline'
import { education, examinations, experience } from '../../data/experience'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional background"
      description="Quality engineering in medical-device and precision manufacturing since 2017, built on a B.Tech in mechanical engineering and an M.Tech in mechatronics and robotics."
      tinted
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          {experience.map((job) => (
            <Reveal key={job.company} as="article" className="rounded-2xl border border-line bg-surface p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Briefcase size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-fg">{job.role}</h3>
                    <p className="font-medium text-muted">{job.company}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-subtle">
                      <MapPin size={14} aria-hidden="true" /> {job.location}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 font-mono text-xs ${job.current ? 'bg-success-soft text-success' : 'bg-surface-2 text-muted'}`}>
                  {job.period}
                  {job.duration && ` · ${job.duration}`}
                </span>
              </div>
              <p className="mt-5 text-muted">{job.summary}</p>

              {job.achievements && (
                <div className="mt-6 rounded-xl border border-line bg-surface-2 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
                    <Award size={16} className="text-primary" aria-hidden="true" /> Key achievements
                  </h4>
                  <ul className="space-y-2">
                    {job.achievements.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-muted">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={`mt-6 grid gap-6 ${job.groups.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {job.groups.map((group) => (
                  <div key={group.title}>
                    <h4 className="mb-2 text-sm font-semibold text-fg">{group.title}</h4>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {job.products && (
                <div className="mt-6 border-t border-line pt-5">
                  <h4 className="mb-2 text-sm font-semibold text-fg">Products managed</h4>
                  <ul className="flex flex-wrap gap-2">
                    {job.products.map((pr) => (
                      <li key={pr} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-muted">
                        {pr}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          ))}

          <Reveal as="article" className="rounded-2xl border border-line bg-surface p-6 md:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <GraduationCap size={22} aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold text-fg">Education</h3>
            </div>
            <ol className="space-y-6">
              {education.map((ed) => (
                <li key={ed.degree} className="border-l-2 border-line pl-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="font-semibold text-fg">{ed.degree}</p>
                    {ed.period && <span className="font-mono text-xs text-subtle">{ed.period}</span>}
                  </div>
                  <p className="text-muted">{ed.institution}</p>
                  {ed.areas && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Areas of study">
                      {ed.areas.map((a) => (
                        <li key={a} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-muted">
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          {examinations.length > 0 && (
            <Reveal as="article" className="rounded-2xl border border-line bg-surface p-6 md:p-8">
              <div className="mb-5 flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-success-soft text-success">
                  <Award size={22} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-fg">Examinations</h3>
              </div>
              <ul className="space-y-3">
                {examinations.map((ex) => (
                  <li key={ex.title} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span>
                      <span className="block font-semibold text-fg">{ex.title}</span>
                      <span className="block text-sm text-muted">{ex.detail}</span>
                    </span>
                    <span className="font-mono text-xs text-subtle">{ex.year}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold text-fg">Career timeline</h3>
          <Timeline />
        </div>
      </div>
    </Section>
  )
}
