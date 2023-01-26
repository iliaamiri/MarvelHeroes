import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: 'https://impolite-cake-production.up.railway.app/',
        target: 'http://localhost:43759/',
        changeOrigin: true,
      }
    }
  }
})
