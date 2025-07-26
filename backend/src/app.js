// codesync-backend/src/app.js
// Main Express application setup. This file will consolidate middleware and routes.
// CORS origin explicitly set for debugging.

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
// import config from './config/index.js'; // Temporarily commenting out config import for direct origin test

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Explicitly set frontend URL for CORS
    credentials: true
}));
app.use(express.json()); // For parsing application/json bodies

// API Routes
app.use('/api/auth', authRoutes); // Use authentication routes

// Basic route for testing
app.get('/', (req, res) => {
    res.send('CodeSync Backend API is running!');
});

export default app; // Export the app for use in server.js
