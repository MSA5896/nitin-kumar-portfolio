import { ArrowRight, Download, MapPin } from 'lucide-react'
import Button from '../ui/Button'
import { profile } from '../../data/profile'
import { site } from '../../config/site'
import { asset } from '../../utils/config'
import { sectionHref, useSectionNav } from '../../hooks/useSectionNav'
import { useResumeAvailable } from '../../hooks/useResumeAvailable'

/** Decorative technical signal trace — subtle, no stock imagery. */
function SignalTrace() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-primary opacity-[0.18]"
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 110 H180 L210 110 L230 60 L250 140 L270 90 L290 110 H520 L540 110 L560 40 L585 130 L605 110 H860 L880 110 L895 75 L915 120 L930 110 H1200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M0 140 H1200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
    </svg>
  )
}

export default function Hero() {
  const goTo = useSectionNav()
  const resumeAvailable = useResumeAvailable()

  return (
    <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero-title">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl"
        aria-hidden="true"
      />
      <SignalTrace />

      <div className="container-page relative py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-sm text-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            {site.availability}
          </p>

          <h1 id="hero-title" className="text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {profile.name.toUpperCase()}
          </h1>
          <p className="mt-5 text-xl font-semibold tracking-wide text-fg sm:text-2xl">{profile.headline.toUpperCase()}</p>
          <p className="mt-2 font-mono text-sm tracking-wider text-primary sm:text-base">
            AI AUTOMATION <span className="text-subtle">|</span> DATA <span className="text-subtle">|</span> IoT{' '}
            <span className="text-subtle">|</span> ROBOTICS
          </p>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-fg/90 text-pretty md:text-2xl">{profile.heroStatement}</p>
          <p className="mt-4 max-w-2xl text-muted text-pretty">{profile.heroSupport}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={sectionHref('projects')} onClick={(e) => goTo('projects', e)} size="lg">
              View Projects <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href={sectionHref('contact')} onClick={(e) => goTo('contact', e)} variant="secondary" size="lg">
              Hire Me
            </Button>
            {resumeAvailable ? (
              <Button href={asset(site.resume)} variant="ghost" size="lg" download external={false}>
                <Download size={18} aria-hidden="true" /> Download Resume
              </Button>
            ) : (
              <Button href={sectionHref('resume')} onClick={(e) => goTo('resume', e)} variant="ghost" size="lg">
                <Download size={18} aria-hidden="true" /> Resume
              </Button>
            )}
          </div>

          <p className="mt-10 inline-flex items-center gap-2 text-sm text-subtle">
            <MapPin size={16} aria-hidden="true" /> {site.location}
          </p>
        </div>
      </div>
    </section>
  )
}
