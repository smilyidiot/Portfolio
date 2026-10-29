import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to the Flask backend during local dev so the
    // frontend can call /api/* without worrying about CORS or ports.
    proxy: {
      '/api': 'http://localhost:5001',
    },
  },
})
