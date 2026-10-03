import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isHashRouter } from '../utils/config'

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ block: 'start' })
  // Move focus for keyboard and screen-reader users without a second jump.
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  return true
}

/** href used for section links (real anchors in browser mode for no-JS/crawlers). */
export const sectionHref = (id) => (isHashRouter ? `#/?s=${id}` : `${import.meta.env.BASE_URL}#${id}`)

/** Navigate to a home-page section from anywhere in the app. */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id, event) => {
      event?.preventDefault()
      if (pathname === '/') {
        scrollToSection(id)
        if (!isHashRouter) window.history.replaceState(null, '', `#${id}`)
      } else {
        navigate('/', { state: { section: id } })
      }
    },
    [navigate, pathname],
  )
}

/** Highlights the nav item for the section currently in view. */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) {
      setActive('')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
