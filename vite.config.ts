import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set the correct base path for GitHub Pages so asset URLs resolve when
  // the site is served from https://<user>.github.io/Portfolio/
  base: '/Portfolio/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
