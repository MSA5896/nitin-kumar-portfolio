import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { sectionHref, useSectionNav } from '../../hooks/useSectionNav'

export default function BusinessCta() {
  const goTo = useSectionNav()
  return (
    <section aria-labelledby="cta-heading" className="py-16 md:py-20">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-12 text-center md:px-12 md:py-16">
          <div className="bg-grid absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative">
            <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
              Have a repetitive technical task?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted">Let&apos;s turn it into an automated workflow.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={sectionHref('contact')} onClick={(e) => goTo('contact', e)} size="lg">
                Start a Project <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href={sectionHref('projects')} onClick={(e) => goTo('projects', e)} variant="secondary" size="lg">
                View My Work
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
