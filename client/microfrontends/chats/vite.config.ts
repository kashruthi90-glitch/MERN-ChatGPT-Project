import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      // insertTypesEntry: true, // Adds "types" to your package.json automatically
      rollupTypes: true,       // Merges all types into a single bundle.d.ts
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/App.tsx'),
      name: 'chats',
      fileName: 'bundle',
      formats: ['es'], // <--- Use 'es' for best results with Vite Shell
      cssFileName: 'bundle'
    },
    rollupOptions: {
      // IMPORTANT: Do not bundle React into the login MFE!
      // This avoids "Invalid Hook Call" errors.
      external: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          '@tanstack/react-query': 'ReactQuery'
        }
      }
    }
  }
})
