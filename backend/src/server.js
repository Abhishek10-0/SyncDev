// codesync-backend/server.js
// This is the main entry point for the backend application.
// It sets up the Express server, connects to MongoDB, and initializes Socket.IO.
// Updated to use ES module syntax (import/export).

import express from 'express';
import { createServer } from 'http'; // Use named import for createServer
import { Server } from 'socket.io'; // Use named import for Server
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = createServer(app); // Use createServer from 'http'

// Configure Socket.IO
// Allow CORS for frontend connection
const io = new Server(server, { // Use new Server() for Socket.IO
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow your frontend origin
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json()); // For parsing application/json

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

// Connect to database
connectDB();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('CodeSync Backend API is running!');
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

// Define the port to run on
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export io for use in other modules (e.g., roomSocket.js)
// When using ES modules, you export directly, not via module.exports
// For now, we'll keep io available globally or pass it as needed.
// If other modules need 'io', you'd typically import it or pass it.
// For simplicity in this setup, we'll assume server.js manages the main socket instance.
