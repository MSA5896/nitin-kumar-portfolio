import { useEffect } from 'react'

const DEFAULT_TITLE = 'Nitin Kumar | QA & Manufacturing Engineer · AI Automation, Data, IoT & Robotics'

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector)
  if (el && value) el.setAttribute(attr, value)
}

/** Updates the document title and description per page (helps SEO and shared links). */
export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Nitin Kumar` : DEFAULT_TITLE
    document.title = fullTitle
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }
  }, [title, description])
}
