// codesync-frontend/src/context/AuthContext.jsx
// This file defines the authentication context for the frontend.
// It will manage user login state and provide functions for authentication.
// Renamed to .jsx to correctly parse JSX syntax.

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // For making API calls
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check if initial auth state is loaded
  const navigate = useNavigate();

  // Check for user in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Auth state loaded
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      // You might want to display an error message to the user here
      throw error; // Re-throw to allow component to catch and display error
    }
  };

  // Signup function
  const signup = async (username, email, password, fullName) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/signup`,
        { username, email, password, fullName }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard'); // Navigate to dashboard on successful signup
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      // You might want to display an error message to the user here
      throw error; // Re-throw to allow component to catch and display error
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    navigate('/'); // Navigate to login page on logout
  };

  // Context value that will be provided to children components
  const authContextValue = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children} {/* Render children only after auth state is loaded */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
