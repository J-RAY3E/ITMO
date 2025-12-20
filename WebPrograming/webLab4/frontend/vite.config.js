import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/weblab3',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Depends if backend expects /api prefix or not.
        // My AppConfig has @ApplicationPath("/api"). So backend expects /api.
        // So no rewrite needed.
      }
    }
  }
})
