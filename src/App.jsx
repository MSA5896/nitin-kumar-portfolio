import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Notes from './pages/Notes'
import NoteDetail from './pages/NoteDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:slug" element={<NoteDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
