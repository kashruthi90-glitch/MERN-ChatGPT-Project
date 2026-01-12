import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ 
      // insertTypesEntry: true, // Adds "types" to your package.json automatically
      rollupTypes: true,       // Merges all types into a single bundle.d.ts
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    })
  ],
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    manifest: true,
    lib: {
      entry: [
        resolve(__dirname, 'src/App.tsx'),
        resolve(__dirname, 'src/index.css')
      ],
      name: 'chats',
      fileName: (_, entryName) => {
        // Keeps the JS file named bundle.js
        if (entryName === 'App') return `bundle.js`;
        return `${entryName}.js`;
      },
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
        },
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'bundle.css';
          }
          return '[name].[ext]';
        },
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // No need for CORS or withCredentials if you use this!
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, _, _res) => {
            // Logs the cookie header from the backend if it exists
            const sc = proxyRes.headers['set-cookie'];
            if (sc) console.log('Backend sent cookie:', sc);
          });
        },
      },
    },
  },
})
