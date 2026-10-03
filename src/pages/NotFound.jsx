import Button from '../components/ui/Button'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({ title: 'Page not found' })
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-fg">This page could not be found.</h1>
      <p className="mt-3 text-lg text-muted">The link may be outdated, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button to="/">Back to home</Button>
        <Button to="/" state={{ section: 'projects' }} variant="secondary">
          View projects
        </Button>
      </div>
    </div>
  )
}
