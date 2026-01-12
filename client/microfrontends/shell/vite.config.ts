import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    // If you encounter issues with multiple versions of React being loaded
    dedupe: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query']
  },
  build: {
    emptyOutDir: true,
    commonjsOptions: {
      include: [/login/, /chats/, /node_modules/] // Ensure it can handle the bundle if it's CJS\
    }
  },
  optimizeDeps: {
    // This will tell vite to optimise by including the build of login and chat mfe in its dependency
    // this will create .vite in node-modules.
    // doing this will create problem in development where any changes in login/chat app will not reflect in shell
    // it would require us to delete .vite and restart the shell. so tell vite to exclude them in dev mode
    // include: ['login', 'chats'],
    exclude: ['login', 'chats']
  },
  // all api calls starting from /api should be redirected to http://localhost:3000 with this setting 
  // while making api call from axios don't mention "backend address - http://localhost:3000/api...", just mention "/api.." instead
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, // change the host address to correct backend
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
