import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { Desktop } from './system/desktop/desktop'

/**
 * App entry point: mounts the entire desktop-simulation UI (taskbar,
 * shortcuts, and windowed apps) into the #root element defined in index.html.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Desktop />
  </StrictMode>,
)