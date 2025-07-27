// codesync-backend/src/routes/roomRoutes.js
// API routes for room management.
// Uses ES module syntax.

import express from 'express';
import {
    createRoom,
    getRooms,
    getRoomById,
    joinRoom,
    leaveRoom,
    deleteRoom
} from '../controllers/roomController.js';
import protect from '../middlewares/authmiddleware.js'; // Import the authentication middleware

const router = express.Router();

// Public route to get all rooms
router.get('/', getRooms);

// Protected routes
router.post('/', protect, createRoom); // Create room requires authentication
router.get('/:id', protect, getRoomById); // Getting a specific room (even if public, we might need user context)
router.post('/:id/join', protect, joinRoom); // Join room requires authentication
router.post('/:id/leave', protect, leaveRoom); // Leave room requires authentication
router.delete('/:id', protect, deleteRoom); // Delete room requires authentication (and owner check in controller)

export default router; // This line is crucial for the default export
