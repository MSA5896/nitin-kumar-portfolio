import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ConfigWarning from './ConfigWarning'
import { scrollToSection } from '../../hooks/useSectionNav'

/** Scrolls to top on route change, or to a requested home section. */
function ScrollManager() {
  const { pathname, hash, search, state } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    const target = state?.section || params.get('s') || (hash ? hash.slice(1) : null)
    if (pathname === '/' && target) {
      // Wait a frame so the home sections are rendered.
      requestAnimationFrame(() => scrollToSection(target))
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, search, state])

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="pt-16 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      {import.meta.env.DEV && <ConfigWarning />}
    </>
  )
}
