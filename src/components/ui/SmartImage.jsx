import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { asset } from '../../utils/config'

/**
 * Lazy-loaded image that falls back to a clean placeholder when `src` is
 * missing or fails to load. Visitors never see a broken-image icon.
 */
export default function SmartImage({ src, alt, label, className = '', aspect = 'aspect-video', eager = false, illustration = false }) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <div className={`relative overflow-hidden rounded-xl border border-line bg-surface-2 ${aspect} ${className}`}>
      {showImage ? (
        <img
          src={asset(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="bg-grid absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-subtle" role="img" aria-label={alt || label || 'Image placeholder'}>
          <ImageIcon size={26} strokeWidth={1.5} aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-wider">{label || 'Image coming soon'}</span>
        </div>
      )}
      {showImage && illustration && (
        <span className="absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-white/85 backdrop-blur-sm">
          Illustration
        </span>
      )}
    </div>
  )
}
