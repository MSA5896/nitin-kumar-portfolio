import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Horizontal scroll-snap slider with prev/next buttons. Swipe, trackpad and
 * keyboard (arrow keys when focused) all work. Each child is one slide.
 */
export default function Slider({ children, label, slideClass = 'basis-[72%] sm:basis-[40%] lg:basis-[30%] xl:basis-[23.5%]' }) {
  const ref = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update, children])

  const move = (dir) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') move(1)
    if (e.key === 'ArrowLeft') move(-1)
  }

  const btn =
    'absolute top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-line bg-surface p-2 text-fg shadow-card transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-0 md:grid'

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <button type="button" className={`${btn} -left-4`} onClick={() => move(-1)} disabled={edge.start} aria-label={`Previous ${label}`}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <ul
        ref={ref}
        onScroll={update}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-primary"
      >
        {Array.isArray(children) ? children.map((c, i) => <li key={c.key ?? i} className={`min-w-0 shrink-0 snap-start ${slideClass}`}>{c}</li>) : <li className={`shrink-0 snap-start ${slideClass}`}>{children}</li>}
      </ul>
      <button type="button" className={`${btn} -right-4`} onClick={() => move(1)} disabled={edge.end} aria-label={`Next ${label}`}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
      <p className="mt-1 text-center text-xs text-subtle md:hidden">Swipe for more →</p>
    </div>
  )
}
