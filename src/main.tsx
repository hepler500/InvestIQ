import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// In development, unregister any existing service workers to avoid
// showing the "Fetch event handler is recognized as no-op" warning
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Only run in dev mode
  // Vite exposes `import.meta.env.DEV` as a boolean
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (import.meta.env && import.meta.env.DEV) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister()))
      .catch(() => {
        /* ignore errors */
      });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
