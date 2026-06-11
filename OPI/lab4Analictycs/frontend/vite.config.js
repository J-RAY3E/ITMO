import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/webLab4/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/weblab3',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "localhost" // Ensure cookies are set for localhost
      }
    }
  }
})
