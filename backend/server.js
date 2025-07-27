// codesync-backend/server.js
// This is the main entry point for the backend application.
// It sets up the Express server, connects to MongoDB, and initializes Socket.IO.
// Updated to use ES module syntax and import 'app' from app.js.
// CORS origin explicitly set for debugging.

import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './src/config/db.js'; // Import connectDB function
import app from './src/app.js'; // Import the Express app from app.js
import { initializeRoomSockets } from './src/sockets/roomSocket.js'; // Import the new socket handler
// import config from './src/config/index.js'; // Temporarily commenting out config import for direct origin test

// Connect to database
connectDB();

const server = createServer(app); // Use the imported app

// Configure Socket.IO
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Explicitly set frontend URL for CORS
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    // You can add more socket event handlers here as we build out features
    // For example: socket.on('joinRoom', (roomId) => { ... });
});

// Initialize room-specific Socket.IO handlers
initializeRoomSockets(io); // Pass the io instance to your room socket logic

// Define the port to run on
const PORT = process.env.PORT || 8000; // Use process.env.PORT directly for now

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Note: 'io' can be passed to other modules if needed, or accessed via a global context if designed that way.
// For now, it's managed here.
