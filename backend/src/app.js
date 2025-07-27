// codesync-backend/src/app.js
// Main Express application setup. This file will consolidate middleware and routes.
// Uses ES module syntax.

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js'; // Import file routes - THIS LINE IS CRUCIAL
import roomRoutes from './routes/roomRoutes.js'; // Import room routes
import config from './config/index.js'; // Import config

const app = express();

// Middleware
app.use(cors({
    origin: config.frontendURL, // Use frontendURL from config
    credentials: true
}));
app.use(express.json()); // For parsing application/json bodies

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/rooms', roomRoutes); // Room management routes
app.use('/api/rooms/:roomId/files', fileRoutes); // Mount file routes under /api/rooms/:roomId/files

// Basic route for testing
app.get('/', (req, res) => {
    res.send('CodeSync Backend API is running!');
});

export default app; // Export the app for use in server.js
