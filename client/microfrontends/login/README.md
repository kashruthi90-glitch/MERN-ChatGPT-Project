# Login Microfrontend (MFE)
The Login MFE is a dedicated module responsible for user authentication, including Login and Signup flows. It is designed to be consumed by the Shell host application as a local workspace dependency.

# Key Features
1. Authentication Logic: Isolated components for user login and account creation.
2. Lazy Loaded: Consumed dynamically by the Shell to optimize initial bundle size.
3. Type Safety: Ships with automatically generated TypeScript declaration files (.d.ts).

# Build Configuration (Library Mode)
To allow the Shell to import this MFE as a module, it is built in Library Mode rather than as a standalone application. This ensures that the output is a clean JavaScript bundle (ESM) that the Shell can resolve.

# Vite Configuration
The vite.config.ts is configured to externalize React to avoid the "Multiple React Instances" crash and to generate type definitions.

```js
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      insertTypesEntry: true, // Auto-links types in package.json
      rollupTypes: true       // Merges all declarations into bundle.d.ts
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LoginMFE',
      fileName: 'bundle',
      formats: ['es']
    },
    rollupOptions: {
      // ⚠️ DO NOT bundle React/React-DOM
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
```

# Package Configuration
To ensure the Shell can find the entry points, the package.json must explicitly point to the generated bundle and type definitions.

```json
{
  "name": "login",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/bundle.js",
  "types": "./dist/bundle.d.ts",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

# Integration with Shell
Add as Dependency: In the Shell's package.json, add "login": "*".
Lazy Load:
```js
const Login = React.lazy(() => import('login'));
```