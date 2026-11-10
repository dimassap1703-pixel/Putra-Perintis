import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/home/dimassaputra/Downloads/putra-perintis/src',
    },
  },
  server: {
    port: 5173,
  },
})
