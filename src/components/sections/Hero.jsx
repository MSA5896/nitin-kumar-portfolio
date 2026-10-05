import { MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { site } from '../../config/site'

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

  return (
    <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero-title">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary opacity-[0.07] blur-3xl"
        aria-hidden="true"
      />
      <SignalTrace />

      <div className="container-page relative py-8 md:py-10 lg:py-12">
        <div className="max-w-5xl">
          <p className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1">
              <span className="pulse-dot h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              {site.availability}
            </span>
            <span className="inline-flex items-center gap-1.5 text-subtle">
              <MapPin size={15} aria-hidden="true" /> {site.location}
            </span>
          </p>

          <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {profile.name.toUpperCase()}
          </h1>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-lg font-semibold tracking-wide text-fg sm:text-xl">{profile.headline.toUpperCase()}</span>
            <span className="font-mono text-sm tracking-wider text-primary">
              AI AUTOMATION <span className="text-subtle">|</span> DATA <span className="text-subtle">|</span> IoT{' '}
              <span className="text-subtle">|</span> ROBOTICS
            </span>
          </p>

          <p className="mt-3 max-w-4xl text-lg leading-snug text-fg/90 text-pretty md:text-xl">{profile.heroStatement}</p>
          <p className="mt-2 max-w-4xl text-[0.95rem] text-muted text-pretty">{profile.heroSupport}</p>
        </div>
      </div>
    </section>
  )
}
