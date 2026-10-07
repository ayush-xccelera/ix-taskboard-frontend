import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: {
    port: 53181,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com'],
    proxy: {
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
      '/socket.io': { target: 'http://localhost:5000', changeOrigin: true, ws: true }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
