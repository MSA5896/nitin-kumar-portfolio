/**
 * Regenerates public/sitemap.xml from the project and blog data.
 *
 * Usage:
 *   npm run sitemap -- https://your-domain.com
 * Without an argument it writes the YOUR_WEBSITE_URL placeholder.
 */
import { writeFileSync } from 'node:fs'
import { projects } from '../src/data/projects.js'
import { posts } from '../src/data/blog.js'

const base = (process.argv[2] || 'YOUR_WEBSITE_URL').replace(/\/$/, '')
const paths = [
  '/',
  '/notes',
  ...projects.map((p) => `/projects/${p.slug}`),
  // Draft notes are left out until published (thin pages hurt SEO).
  ...posts.filter((p) => p.status === 'Published').map((p) => `/notes/${p.slug}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml written with ${paths.length} URLs for ${base}`)
