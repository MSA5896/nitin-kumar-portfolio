import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import { isHashRouter } from './utils/config'
import './index.css'

// GitHub Pages build (`npm run build:gh`) uses hash URLs so refreshes never 404.
const Router = isHashRouter ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router {...(isHashRouter ? {} : { basename: import.meta.env.BASE_URL })}>
      <App />
    </Router>
  </StrictMode>,
)
