// codesync-frontend/src/main.jsx
// This is the entry point for the React application using Vite.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Note the .jsx extension for Vite
import './index.css'; // Import your main CSS file (Tailwind CSS)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
);
