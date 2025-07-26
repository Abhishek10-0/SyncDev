// codesync-frontend/src/App.jsx
// Main application component. This will handle routing and context providers.
// Updated to ensure BrowserRouter is the outermost wrapper and import AuthContext.jsx.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/DashBoard'
import Profile from './pages/Profile';
import Room from './pages/Room';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext.jsx'; // Updated import to .jsx
import { SocketProvider } from './context/SocketContext'; // We'll create this soon

function App() {
  return (
    <Router> {/* Router is now the outermost wrapper */}
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen bg-gray-900 text-white font-inter">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<AuthPage />} /> {/* Login/Signup page */}

              {/* Protected routes - will add protection later */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/room/:roomId" element={<Room />} />

              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
