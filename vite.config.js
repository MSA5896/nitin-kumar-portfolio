import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Resume detection happens at build/start time, so visitors never trigger a
// 404 request. After adding public/resume.pdf, restart `npm run dev`.
const hasResume = existsSync(new URL('./public/resume.pdf', import.meta.url))

// Build modes:
//   (default)  base "/"                      -> Vercel, Netlify, custom domain
//   "pages"    base "/nitin-kumar-portfolio/" -> GitHub Pages project site (npm run build:pages)
//   "gh"       relative paths + hash URLs     -> fallback that works under any sub-folder
export const PAGES_BASE = '/nitin-kumar-portfolio/'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'gh' ? './' : mode === 'pages' ? PAGES_BASE : '/',
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
}))
