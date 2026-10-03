import { ArrowDown, ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'

/**
 * Architecture / workflow diagram rendered from data.
 * Horizontal on wide screens, vertical on mobile. `planned` renders a dashed,
 * clearly labelled "future" variant.
 */
export default function FlowDiagram({ steps, title, note, planned = false, compact = false }) {
  return (
    <figure
      className={`rounded-2xl border p-5 md:p-6 ${planned ? 'border-dashed border-line-strong bg-transparent' : 'border-line bg-surface'}`}
      aria-label={title || 'Architecture diagram'}
    >
      {(title || note) && (
        <figcaption className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          {title && <span className="font-semibold text-fg">{title}</span>}
          {note && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${planned ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-muted'}`}>
              {note}
            </span>
          )}
        </figcaption>
      )}
      <ol className={`flex flex-col items-stretch gap-2 ${compact ? '' : 'xl:flex-row xl:items-stretch'}`}>
        {steps.map((step, i) => (
          <Reveal as="li" key={step.label} delay={i * 70} className={`flex flex-col items-stretch gap-2 ${compact ? '' : 'xl:flex-1 xl:min-w-0 xl:flex-row xl:items-center'}`}>
            <div
              className={`flex-1 rounded-xl border px-4 py-3 ${planned ? 'border-dashed border-line-strong' : 'border-line bg-surface-2'} ${compact ? '' : 'xl:min-h-full'}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.7rem] text-primary">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-sm font-semibold leading-snug text-fg">{step.label}</span>
              </div>
              {step.detail && <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>}
            </div>
            {i < steps.length - 1 && (
              <span className="flex justify-center text-subtle" aria-hidden="true">
                <ArrowDown size={16} className={compact ? '' : 'xl:hidden'} />
                {!compact && <ArrowRight size={16} className="hidden xl:block" />}
              </span>
            )}
          </Reveal>
        ))}
      </ol>
    </figure>
  )
}
