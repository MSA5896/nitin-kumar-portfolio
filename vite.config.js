import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Resume detection happens at build/start time, so visitors never trigger a
// 404 request. After adding public/resume.pdf, restart `npm run dev`.
const hasResume = existsSync(new URL('./public/resume.pdf', import.meta.url))

// `npm run build:gh` uses mode "gh": relative asset paths + hash routing,
// which is what GitHub Pages needs. Every other build uses clean URLs.
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'gh' ? './' : '/',
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
}))
