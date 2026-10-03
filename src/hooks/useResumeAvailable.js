/* global __HAS_RESUME__ */

/**
 * True when public/resume.pdf exists. Checked by vite.config.js at build/start
 * time (no network request). Restart `npm run dev` after adding the file.
 */
export const hasResume = typeof __HAS_RESUME__ !== 'undefined' && __HAS_RESUME__

export function useResumeAvailable() {
  return hasResume
}
