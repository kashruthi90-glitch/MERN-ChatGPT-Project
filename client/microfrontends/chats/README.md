# Chats Microfrontend (MFE)
The Chats MFE is the core functional module of the application. it manages the interaction between the user and the Google Gemini AI Agent, providing a seamless, real-time chat experience. It is dynamically lazy-loaded by the Shell host only after a user has successfully authenticated.

# Key Features:
1. Chat Management: * Fetch and display a comprehensive list of all previous chat sessions.
  * Create new chat sessions with unique identifiers.
  * Delete existing conversations.
2. AI Interaction: Real-time messaging with an AI agent powered by generative AI.
3. Performance Optimized: Implements a "Fast-First" response pattern for creating and updating chats.

# Architecture & Performance
To ensure a high-quality user experience (UX), this MFE utilizes a specific data-flow strategy to minimize perceived latency:
1. Optimistic-Style Returns: When a user creates a new chat or sends a message, the server generates and returns the new object immediately before the final database insertion is confirmed.
2. UI Updates: The interface updates instantly using this returned data, allowing the user to continue their flow without waiting for deep database write-latencies.

# Security & API Configuration
This MFE communicates with a protected Node.js backend. Security is handled via JWT tokens stored in HttpOnly cookies.
* Axios & Credentials:
Since HttpOnly cookies are not accessible via JavaScript, we rely on the browser's native cookie handling. To ensure these tokens are sent with every cross-origin request, a specialized Axios Interceptor is used.
```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // ⚠️ Required to include HttpOnly cookies
});
```

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
      name: 'ChatsMFE',
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
  "name": "chats",
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
Add as Dependency: In the Shell's package.json, add "chats": "*".
Lazy Load:
```js
const Chats = React.lazy(() => import('chats'));
```