/**
 * Post-build step for static hosts (GitHub Pages, Netlify, S3 ...).
 *
 * Usage:  node scripts/postbuild.mjs https://your-domain.com/optional-subpath
 *
 * What it does, inside dist/:
 *  - writes a real HTML file for every route (projects/<slug>/index.html, notes/...)
 *    with that page's own title, description and canonical URL, so search engines
 *    get a proper 200 page instead of relying on a client-side fallback
 *  - copies index.html to 404.html so unknown links still load the app
 *  - writes sitemap.xml and robots.txt using the real site URL
 *  - replaces the YOUR_WEBSITE_URL placeholder everywhere
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/data/projects.js'
import { posts } from '../src/data/blog.js'

const site = (process.argv[2] || '').replace(/\/$/, '')
if (!site) {
  console.error('Pass the live site URL, e.g. node scripts/postbuild.mjs https://example.com')
  process.exit(1)
}

const dist = new URL('../dist/', import.meta.url)
const template = readFileSync(new URL('index.html', dist), 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page({ path, title, description }) {
  const url = `${site}${path}`
  let html = template
  if (title) {
    const full = `${title} | Nitin Kumar`
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(full)}</title>`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(full)}"`)
      .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(full)}"`)
  }
  if (description) {
    html = html
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
      .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
  }
  html = html
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
  return html.replaceAll('YOUR_WEBSITE_URL', site)
}

function write(relPath, content) {
  const target = fileURLToPath(new URL(relPath, dist))
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, content)
}

const routes = [
  { path: '/', file: 'index.html' },
  {
    path: '/notes/',
    file: 'notes/index.html',
    title: 'Technical Notes',
    description: 'Technical notes by Nitin Kumar on AI automation in manufacturing, Python quality data analysis, Raspberry Pi monitoring and ROS2.',
  },
  ...projects.map((p) => ({ path: `/projects/${p.slug}/`, file: `projects/${p.slug}/index.html`, title: p.title, description: p.summary })),
  ...posts.map((p) => ({ path: `/notes/${p.slug}/`, file: `notes/${p.slug}/index.html`, title: p.title, description: p.summary })),
]

for (const r of routes) write(r.file, page(r))
write('404.html', page({ path: '/' }))

const sitemapPaths = ['/', '/notes/', ...projects.map((p) => `/projects/${p.slug}/`), ...posts.filter((p) => p.status === 'Published').map((p) => `/notes/${p.slug}/`)]
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map((p) => `  <url><loc>${site}${p}</loc></url>`).join('\n')}\n</urlset>\n`,
)
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)

console.log(`postbuild: ${routes.length} pages + 404.html, sitemap.xml (${sitemapPaths.length} URLs), robots.txt for ${site}`)
