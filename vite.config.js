import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": '/src',
      "svg": '/src/assets/svg',
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['ruri-front-end.onrender.com']
  }
})
