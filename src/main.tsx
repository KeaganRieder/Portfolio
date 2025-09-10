import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Desktop from './components/desktop/Desktop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Desktop />
  </StrictMode>,
)
