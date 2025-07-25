// codesync-frontend/src/App.jsx
// Main application component. This will handle routing and context providers.

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/DashBoard'
import Profile from './pages/Profile';
import Room from './pages/Room';
import NotFound from './pages/NotFound'; // For 404 page
import { AuthProvider } from './context/AuthContext'; // We'll create this soon
import { SocketProvider } from './context/SocketContext'; // We'll create this soon

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
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
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
