// codesync-frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';



// __dirname equivalent for ES Modules in Vite config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to get the correct path for Monaco workers
const monacoWorkers = {
  'editorWorker': resolve(__dirname, 'node_modules/monaco-editor/esm/vs/editor/editor.worker.js'),
  'jsonWorker': resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/json/json.worker.js'),
  'cssWorker': resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/css/css.worker.js'),
  'htmlWorker': resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/html/html.worker.js'),
  'tsWorker': resolve(__dirname, 'node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js'),
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() //plugin is removed here. Tailwind is configured via postcss.config.js
  ],
  // Your theme configuration is now directly in vite.config.js as requested.
  theme: { // Moved theme configuration here
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#1a202c',
        'secondary-dark': '#2d3748',
        'accent-blue': '#6366f1',
        'accent-purple': '#8b5cf6',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Manually chunk Monaco editor workers to ensure they are loaded correctly
          ...Object.fromEntries(
            Object.entries(monacoWorkers).map(([name, path]) => [
              `monaco-${name}`,
              path,
            ])
          ),
        },
      },
    },
  },
  optimizeDeps: {
    // Include monaco-editor in optimizeDeps to ensure it's pre-bundled by Vite
    include: ['monaco-editor'],
  },
});
