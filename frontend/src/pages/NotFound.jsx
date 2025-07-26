// codesync-frontend/src/pages/NotFound.jsx
// This component displays a 404 Not Found page.

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-dark text-white">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link to="/" className="px-6 py-3 bg-accent-blue hover:bg-accent-purple rounded-md text-lg transition-colors">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound; // Crucial default export
