import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { Desktop } from './feature/desktop/desktop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Desktop />
  </StrictMode>,
)