# Nitin Kumar — Professional Portfolio

Personal portfolio for **Nitin Kumar**, QA & Manufacturing Engineer (AI Automation | Data | IoT | Robotics).
It presents professional experience in medical-device quality engineering, technical projects and freelance services, with a clear contact path for clients.

---

## Features

- Home page with hero, highlights, about, services, featured project, filterable and searchable projects, experience timeline, skills, "why work with me", code, certifications, technical notes, resume and contact.
- A detail page for every project: problem, objective, solution, architecture diagrams, technology, implementation, screenshots, results, challenges and future work.
- Technical notes (blog) with search and clear "Draft" labelling.
- Dark and light mode. The site follows the system preference on the first visit and remembers the visitor's choice.
- Honest skill tiers instead of percentage bars.
- Contact form that never fakes success. It posts to a form service when configured, otherwise it opens the visitor's email app, otherwise it points to LinkedIn.
- Missing links and images degrade gracefully. GitHub, Live Demo, WhatsApp and Resume buttons only appear when configured, and missing images show a clean placeholder.
- A development-only banner lists missing configuration. Visitors never see it.
- SEO: meta description, Open Graph and Twitter cards, JSON-LD, canonical URL, `robots.txt`, `sitemap.xml` and per-page titles.
- Accessibility: semantic HTML, skip link, keyboard navigation, visible focus states, labelled form fields with error messages, and `prefers-reduced-motion` support.
- Small footprint: React, React Router, Tailwind CSS and Lucide icons only. Animations use CSS and IntersectionObserver, not an animation library.

## Technology

| Area | Choice |
| --- | --- |
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Routing | React Router (clean URLs, or hash URLs for GitHub Pages) |
| Icons | Lucide React, plus inline SVG brand icons |
| Language | JavaScript (ES modules) |

---

## Getting started

Requires Node.js 18 or newer.

```bash
cd portfolio
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run build:gh` | Build for GitHub Pages (relative paths and hash URLs) |
| `npm run sitemap -- https://your-domain.com` | Regenerate `public/sitemap.xml` |

---

## Project structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── resume.pdf              ← add your resume here (not included)
│   └── images/
│       ├── og-image.png        ← social preview (1200×630)
│       ├── profile/
│       ├── projects/
│       ├── certificates/
│       └── blog/
├── scripts/
│   ├── generate-sitemap.mjs
│   └── og-image.html           ← source design for og-image.png
├── src/
│   ├── config/site.js          ← name, email, links, WhatsApp, resume, URL
│   ├── data/                   ← ALL CONTENT LIVES HERE
│   │   ├── profile.js          ← headline, about, highlights, why-work-with-me
│   │   ├── experience.js       ← jobs, education, timeline
│   │   ├── skills.js           ← proficiency tiers and skill categories
│   │   ├── services.js         ← freelance services and work process
│   │   ├── projects.js         ← projects, filters and detail-page content
│   │   ├── blog.js             ← technical notes
│   │   └── certifications.js   ← real certificates only
│   ├── components/
│   │   ├── layout/             ← Navbar, Footer, Layout, dev ConfigWarning
│   │   ├── sections/           ← one file per home-page section
│   │   ├── diagrams/           ← FlowDiagram (architecture diagrams)
│   │   └── ui/                 ← Button, Section, Badges, SmartImage, icons...
│   ├── hooks/                  ← theme, scroll reveal, section nav, page meta
│   ├── pages/                  ← Home, ProjectDetail, Notes, NoteDetail, NotFound
│   ├── utils/                  ← config helpers and search
│   ├── index.css               ← design tokens (colors, fonts) and base styles
│   ├── App.jsx                 ← routes
│   └── main.jsx
├── index.html                  ← SEO and social meta tags
├── vercel.json                 ← SPA rewrites for Vercel
└── vite.config.js
```

---

## How to update your information

### Contact details and links

Edit `src/config/site.js`:

```js
email: 'you@yourdomain.com',
github: 'https://github.com/your-username',
whatsapp: '9198XXXXXXXX',            // digits with country code; leave as WHATSAPP_NUMBER to hide
url: 'https://your-domain.com',
profilePhoto: '/images/profile/nitin-kumar.jpg',
```

Any value still set to a placeholder (`YOUR_...`, `GITHUB_URL`, `WHATSAPP_NUMBER`, `...example.com`) is treated as missing.
The related button is hidden for visitors, and `npm run dev` shows a reminder banner.

### Profile text

Edit `src/data/profile.js` for the headline, hero statement, about text, highlight cards and "why work with me".
Edit `src/data/experience.js` for roles, education and the timeline.
Edit `src/data/skills.js` for skill tiers. Each skill can carry `level: 'professional' | 'working' | 'developing'`.

### Colors and fonts

All colors are CSS variables at the top of `src/index.css`, for light (`:root`) and dark (`[data-theme="dark"]`).
Change them there and the whole site follows. Fonts are loaded in `index.html` and set in `--font-sans` / `--font-mono`.

---

## How to add a project

1. Open `src/data/projects.js`.
2. Copy an existing project object and give it a new unique `slug`. Its page will live at `/projects/<slug>`.
3. Set `status` to one of `Prototype`, `In Development`, `Portfolio Project`, `Learning Project` or `Concept`.
4. Add `filters` from: `AI & Data`, `IoT`, `Robotics`, `Quality`, `Manufacturing`, `Embedded`.
5. Fill in `links: { github, demo, docs }`. Empty strings hide the buttons.
6. Describe the flow in `architecture: [{ label, detail }]`. It is drawn as a diagram automatically.
7. Use `futureArchitecture` for planned work. It is drawn dashed and labelled "planned".
8. Set `featured: true` on one project to show it in the Featured section.
9. Run `npm run sitemap -- https://your-domain.com` to add the page to the sitemap.

Only record results, metrics and deployments that have actually happened.

## How to add a blog post / technical note

1. Open `src/data/blog.js` and copy a post object.
2. Give it a unique `slug`, a `title`, `summary`, `tags` and `sections: [{ heading, paragraphs: [], points: [] }]`.
3. Keep `status: 'Draft'` while writing. Drafts show a clear banner and are left out of the sitemap.
4. Set `status: 'Published'` and a `date: 'YYYY-MM-DD'` when finished, then regenerate the sitemap.

## How to add images

1. Put files in the matching folder under `public/images/`, for example `public/images/projects/smart-ot-dashboard.png`.
2. Reference them with a path starting at `/images/...`:
   - Project hero: `image: '/images/projects/smart-ot-hero.jpg'`
   - Screenshots: `screenshots: [{ src: '/images/projects/smart-ot-dashboard.png', caption: 'Dashboard' }]`
   - Profile photo: `profilePhoto` in `site.js`
   - Certificates: `image` in `certifications.js`
   - Blog covers: `image` in `blog.js`
3. Use JPG or WebP for photos and PNG for screenshots. Keep files under about 300 KB.

All images are lazy-loaded. If a file is missing or fails to load, a neat placeholder appears instead.

## How to add GitHub links

- Profile: set `github` in `src/config/site.js`. A GitHub button then appears in the footer and Code section.
- Per project: set `links.github`, and optionally `links.demo` and `links.docs`, in `src/data/projects.js`.

## How to add your resume

Copy your PDF to `public/resume.pdf` (exact name), then restart `npm run dev` or rebuild.
"Download Resume" buttons appear automatically.
Until then, visitors see a LinkedIn link instead, and the dev banner reminds you.

## How to add certifications

Add real certificates to `src/data/certifications.js` using the example format in that file.
While the list is empty, the section shows placeholders in development only and is hidden on the live site.

## How the contact form works

Visitors fill in their own details first. Your email and phone number appear only after they submit.

- **Delivery:** the form posts to [FormSubmit](https://formsubmit.co), a free third-party service that emails the visitor's details to the address in `src/config/site.js`. **After you deploy, submit the form once yourself and click the "Activate form" link FormSubmit emails you.** Until then, messages are not delivered.
- **If delivery fails**, the visitor is told so and still sees your contact details so they can reach you directly.
- **Your details** (`email`, `phone`, `phoneDisplay`) live in `src/config/site.js`. Note that they are part of the site's JavaScript, so this hides them from casual visitors and simple scrapers, not from someone who inspects the code.
- **Spam:** a hidden honeypot field drops most bot submissions.
- **Use a different service** such as Formspree by setting `VITE_FORM_ENDPOINT` in `.env.local` (and in Vercel's environment variables).
- **WhatsApp:** to also reveal a WhatsApp button, set `whatsapp` in `site.js` (digits with country code, for example `917536855614`).

## SEO checklist after deployment

1. Replace `YOUR_WEBSITE_URL` in `index.html` (canonical and `og:` tags) and in `public/robots.txt`.
2. Run `npm run sitemap -- https://your-domain.com`.
3. Set `url` in `src/config/site.js`.
4. Optionally submit the sitemap in Google Search Console.

---

## Deploy to Vercel (recommended)

1. Push the `portfolio` folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository.
3. Vercel detects Vite automatically. Build command: `npm run build`. Output directory: `dist`.
   If the repository root is the parent folder, set **Root Directory** to `portfolio`.
4. Add `VITE_FORM_ENDPOINT` under Environment Variables if you use a form service.
5. Click **Deploy**. `vercel.json` already handles page refreshes on routes like `/projects/...`.
6. Optionally add a custom domain under Project → Settings → Domains, then complete the SEO checklist above.

## Deploy to GitHub Pages

1. Run `npm run build:gh`. This uses relative asset paths and hash URLs such as `/#/projects/...`, so it works in a sub-folder and refreshes never 404.
2. Publish the contents of `dist/`:
   - **Simple:** push `dist/` to a `gh-pages` branch, for example with `npx gh-pages -d dist`. Then in the repository go to Settings → Pages and select the `gh-pages` branch.
   - **GitHub Actions:** use the official "Deploy static content to Pages" workflow, with `npm ci && npm run build:gh` as the build step and `dist` as the upload path.
3. The site will be at `https://<username>.github.io/<repository>/`.

---

## Content principles

This portfolio deliberately avoids invented employers, clients, certifications, awards, metrics, deployments, approvals or testimonials.
Projects carry their real status, AI features that are not built yet are labelled "planned", and the Smart OT system is presented as a development initiative without regulatory or clinical claims.
Keep it that way as you add content.
