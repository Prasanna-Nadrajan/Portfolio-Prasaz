// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://prasaz.vercel.app',
      dynamicRoutes: [
        '/',
        '/portfolio',
        '/experience',
        '/blog',
        '/platforms',
        '/resume',
        '/contact',
        '/github-wrapped',
        '/leetcode-wrapped'
      ]
    })
  ],
})