const PLACEHOLDER_PATTERNS = [/^YOUR_/i, /^GITHUB_URL$/, /^WHATSAPP_NUMBER$/, /example\.com/i]

/** True when a config value has been filled in with something real. */
export function isConfigured(value) {
  if (!value || typeof value !== 'string') return false
  const v = value.trim()
  return v.length > 0 && !PLACEHOLDER_PATTERNS.some((re) => re.test(v))
}

/** Resolve a file in /public so it works with both "/" and "./" (GitHub Pages) bases. */
export function asset(path) {
  if (!path) return null
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

export const isHashRouter = import.meta.env.VITE_ROUTER === 'hash'
