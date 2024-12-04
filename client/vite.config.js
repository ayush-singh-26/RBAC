import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'https://rbac-2in6.onrender.com'
    }
  },
  plugins: [react()],
})