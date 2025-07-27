// codesync-backend/src/routes/fileRoutes.js
// API routes for file system operations within rooms.

import express from 'express';
import {
    listRoomContents,
    createNode,
    getFileContent,
    updateFileContent,
    deleteNode,
    uploadFileToRoom
} from '../controllers/fileController.js';
import protect from '../middlewares/authmiddleware.js'; // Import authentication middleware
import Room from '../models/Room.js'; // Import Room model for membership check

const router = express.Router({ mergeParams: true }); // mergeParams to access roomId from parent router

// Middleware to check if user is a member of the room (re-defined here for clarity, could be a shared middleware)
const checkRoomMembership = async (req, res, next) => {
    const { roomId } = req.params;
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }
        // Check if user is the owner or a member
        if (room.owner.toString() !== req.user._id.toString() && !room.members.some(member => member.toString() === req.user._id.toString())) {
            return res.status(403).json({ message: 'Access denied. Not a member of this room.' });
        }
        next();
    } catch (error) {
        console.error('Error checking room membership:', error);
        res.status(500).json({ message: 'Server error checking room membership.' });
    }
};

// All file routes are protected and require room membership
router.use(protect);
router.use(checkRoomMembership); // Apply membership check to all routes below

// Routes for file system operations
router.get('/', listRoomContents); // List contents of a directory (e.g., /api/rooms/:roomId/files?path=subdir)
router.post('/', createNode); // Create file/folder (e.g., /api/rooms/:roomId/files)
router.get('/content', getFileContent); // Get file content (e.g., /api/rooms/:roomId/files/content?path=file.js)
router.put('/content', updateFileContent); // Update file content (e.g., /api/rooms/:roomId/files/content)
router.delete('/', deleteNode); // Delete file/folder (e.g., /api/rooms/:roomId/files?path=file.js)

// File upload route
router.post('/upload', uploadFileToRoom); // Upload a file (e.g., /api/rooms/:roomId/upload)

export default router;
