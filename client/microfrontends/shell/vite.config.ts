import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // If you encounter issues with multiple versions of React being loaded
    dedupe: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query']
  },
  build: {
    commonjsOptions: {
      include: [/login/, /chats/, /node_modules/] // Ensure it can handle the bundle if it's CJS\
    }
  },
  optimizeDeps: {
    // Force Vite to include the local package in its dependency discovery
    include: ['login', 'chats']
  }
})
