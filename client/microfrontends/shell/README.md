# Shell Microfrontend (Host)
The Shell acts as the central orchestrator and container for the entire AI Chat application. Its primary responsibility is to manage high-level routing and dynamically load specialized microfrontends (MFEs) only when needed.

# Core Functionalities
1. Uses React.lazy and Suspense to load the Login and Chats remotes on demand.
2. Routing:
    * /login: Loads the Login MFE.
    * /chat: Loads the Chats MFE (Protected Route).

# Dependency Strategy (Local Workspace)
Unlike traditional Module Federation where remotes are fetched over the network, this project treats the Login MFE as a local npm workspace dependency.

In the Shell's package.json: (The "*" tells the package manager to link directly to the local folder in the monorepo.)
```json
"dependencies": {
  "login": "*" 
}
```
# Vite Configuration
A common issue with this architecture is "Double React" errors. Since the Shell and the Login MFE both require React, importing the Login MFE directly could lead to two separate instances of react and react-dom running in the same browser tab, which crashes the application.

* The Fix:
The Shell's vite.config.js is configured to deduplicate these core libraries, forcing every MFE to use the Shell's single instance.
```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // ⚠️ CRITICAL: Prevents multiple React instances
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    // Ensures the local login dependency is pre-bundled correctly by Vite
    include: ['login']
  }
});
```