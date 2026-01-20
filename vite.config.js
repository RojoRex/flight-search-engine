import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/amadeus/v1': {
        target: 'https://test.api.amadeus.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/amadeus\/v1/, ''),
      },
      '/amadeus/v2': {
        target: 'https://test.api.amadeus.com/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/amadeus\/v2/, ''),
      },
    },
  },
  plugins: [react()],
})
