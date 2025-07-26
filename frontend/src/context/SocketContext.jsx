// codesync-frontend/src/context/SocketContext.jsx
// This file defines the Socket.IO context for the frontend.
// It will manage the Socket.IO connection and provide it to child components.

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create the Socket Context
const SocketContext = createContext();

// Socket Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io(backendUrl, {
      transports: ['websocket', 'polling'], // Prioritize websocket
      withCredentials: true, // Send cookies/auth headers
    });

    newSocket.on('connect', () => {
      console.log('Socket.IO connected:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
    });

    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [backendUrl]); // Reconnect if backendUrl changes

  // Context value that will be provided to children components
  const socketContextValue = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={socketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the Socket Context
export const useSocket = () => {
  return useContext(SocketContext);
};
