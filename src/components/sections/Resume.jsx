import { Download, FileText } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { LinkedinIcon } from '../ui/icons'
import { site } from '../../config/site'
import { asset } from '../../utils/config'
import { useResumeAvailable } from '../../hooks/useResumeAvailable'

export default function Resume() {
  const available = useResumeAvailable()

  return (
    <Section id="resume" className="!py-16 md:!py-20">
      <Reveal className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
            <FileText size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 id="resume-heading" className="text-xl font-semibold text-fg">
              Resume
            </h2>
            <p className="mt-1 text-muted">
              {available === false
                ? 'The downloadable resume is being updated. My full professional history is on LinkedIn.'
                : 'Experience, education and technical skills in a single PDF.'}
            </p>
            {import.meta.env.DEV && available === false && (
              <p className="mt-2 rounded-md border border-dashed border-accent bg-accent-soft px-2 py-1 text-xs text-accent">
                Dev only: place your resume at <code>public/resume.pdf</code> to enable the download button.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {available && (
            <Button href={asset(site.resume)} download external={false}>
              <Download size={18} aria-hidden="true" /> Download Resume
            </Button>
          )}
          <Button href={site.linkedin} variant="secondary">
            <LinkedinIcon size={17} /> LinkedIn
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
