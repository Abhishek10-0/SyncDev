// codesync-frontend/src/main.jsx
// This is the entry point for the React application using Vite.
// Added MonacoEnvironment configuration for worker loading.
// Updated worker paths with .js extension for better resolution.
// FIX: Added { type: 'module' } to Worker constructor for ES module parsing.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import your main CSS file (Tailwind CSS)

// Configure MonacoEnvironment to load workers correctly
// This must be done BEFORE any Monaco editor instance is created
window.MonacoEnvironment = {
  getWorker: async (_, label) => {
    // Explicitly add .js extension to worker paths and specify type: 'module'
    if (label === 'json') {
      return new Worker(new URL('monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url), { type: 'module' });
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new Worker(new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url), { type: 'module' });
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new Worker(new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url), { type: 'module' });
    }
    if (label === 'typescript' || label === 'javascript') {
      return new Worker(new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url), { type: 'module' });
    }
    // Default editor worker
    return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module' });
  },
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> {/* Temporarily commented out for debugging */}
    <App />
  // </React.StrictMode>,
);
