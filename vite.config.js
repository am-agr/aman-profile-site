import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/aman-profile-site/',
  plugins: [react()],
})
