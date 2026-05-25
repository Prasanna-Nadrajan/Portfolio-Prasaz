import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Generate a manifest for cache-busting awareness
    manifest: true,

    rollupOptions: {
      output: {
        // Manual chunking separates heavy vendor libs from app code.
        // Browsers can cache these chunks independently — changing your app code
        // won't bust the framer-motion or three.js chunks.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Three.js stack is massive (~900KB unminified) — must be separate
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            // Framer Motion is ~120KB — worth isolating
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // All other node_modules into a shared vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
});