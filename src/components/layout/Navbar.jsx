import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { sectionHref, useActiveSection, useSectionNav } from '../../hooks/useSectionNav'
import { useTheme } from '../../hooks/useTheme'
import { site } from '../../config/site'

export const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
]
// Observe every home section so the indicator clears when you scroll past the nav items.
const SECTION_IDS = ['about', 'services', 'featured', 'projects', 'experience', 'quality-work', 'skills', 'why', 'code', 'certifications', 'notes', 'resume', 'contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const goTo = useSectionNav()
  const active = useActiveSection(SECTION_IDS, pathname === '/')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change and on Escape.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleSection = (id) => (e) => {
    setOpen(false)
    goTo(id, e)
  }

  const linkBase = 'relative rounded-md px-3 py-2 text-[0.94rem] font-medium transition-colors'
  const linkState = (isActive) => (isActive ? 'text-fg' : 'text-muted hover:text-fg')
  const indicator = (isActive) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
    />
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg">
        Skip to content
      </a>
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-surface font-mono text-sm font-bold text-fg transition-colors group-hover:border-primary">
            NK
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[0.95rem] font-semibold text-fg">{site.name}</span>
            <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-subtle">QA · AI · IoT · Robotics</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map(({ id, label }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <a href={sectionHref(id)} onClick={handleSection(id)} className={`${linkBase} ${linkState(isActive)}`} aria-current={isActive ? 'true' : undefined}>
                  {label}
                  {indicator(isActive)}
                </a>
              </li>
            )
          })}
          <li>
            <NavLink to="/notes" className={({ isActive }) => `${linkBase} ${linkState(isActive)}`}>
              {({ isActive }) => (
                <>
                  Notes
                  {indicator(isActive)}
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-primary hover:text-primary"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <a
            href={sectionHref('contact')}
            onClick={handleSection('contact')}
            className="hidden rounded-lg bg-primary px-4 py-2 text-[0.94rem] font-semibold text-primary-fg transition-colors hover:bg-primary-hover sm:inline-flex"
          >
            Hire Me
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {[...NAV_SECTIONS, { id: 'contact', label: 'Contact' }].map(({ id, label }) => (
              <li key={id}>
                <a
                  href={sectionHref(id)}
                  onClick={handleSection(id)}
                  className={`block rounded-md px-3 py-3 text-base font-medium ${active === id ? 'bg-surface-2 text-fg' : 'text-muted'}`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/notes" className="block rounded-md px-3 py-3 text-base font-medium text-muted">
                Technical Notes
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
