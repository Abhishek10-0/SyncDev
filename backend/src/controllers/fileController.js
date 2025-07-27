// codesync-backend/src/controllers/fileController.js
// Controller for file system operations within rooms.

import * as fileSystemService from '../services/fileSystemService.js';
import multer from 'multer'; // For handling file uploads

// Configure multer for memory storage (files will be in req.file.buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to check if user is a member of the room
const checkRoomMembership = async (req, res, next) => {
    const { roomId } = req.params;
    try {
        const room = await Room.findById(roomId); // Assuming Room model is imported or available
        if (!room) {
            return res.status(404).json({ message: 'Room not found.' });
        }
        if (!room.members.includes(req.user._id)) {
            return res.status(403).json({ message: 'Access denied. Not a member of this room.' });
        }
        next();
    } catch (error) {
        console.error('Error checking room membership:', error);
        res.status(500).json({ message: 'Server error checking room membership.' });
    }
};


// @desc    List contents of a directory within a room
// @route   GET /api/rooms/:roomId/files
// @access  Private (members only)
export const listRoomContents = async (req, res) => {
    const { roomId } = req.params;
    const { path: dirPath = '' } = req.query; // Optional path query parameter

    try {
        const contents = await fileSystemService.listDirectoryContents(roomId, dirPath);
        res.status(200).json(contents);
    } catch (error) {
        console.error('Error listing room contents:', error);
        res.status(500).json({ message: error.message || 'Failed to list contents.' });
    }
};

// @desc    Create a new file or folder within a room
// @route   POST /api/rooms/:roomId/files
// @access  Private (members only)
export const createNode = async (req, res) => {
    const { roomId } = req.params;
    const { path: nodePath, isFolder } = req.body; // nodePath is relative to room root

    if (!nodePath) {
        return res.status(400).json({ message: 'Path is required.' });
    }

    try {
        const result = await fileSystemService.createFileSystemNode(roomId, nodePath, isFolder);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating file system node:', error);
        res.status(500).json({ message: error.message || 'Failed to create node.' });
    }
};

// @desc    Read content of a file within a room
// @route   GET /api/rooms/:roomId/files/content
// @access  Private (members only)
export const getFileContent = async (req, res) => {
    const { roomId } = req.params;
    const { path: filePath } = req.query; // filePath is relative to room root

    if (!filePath) {
        return res.status(400).json({ message: 'File path is required.' });
    }

    try {
        const content = await fileSystemService.readFileContent(roomId, filePath);
        res.status(200).send(content); // Send content as plain text
    } catch (error) {
        console.error('Error getting file content:', error);
        res.status(500).json({ message: error.message || 'Failed to get file content.' });
    }
};

// @desc    Update content of a file within a room
// @route   PUT /api/rooms/:roomId/files/content
// @access  Private (members only)
export const updateFileContent = async (req, res) => {
    const { roomId } = req.params;
    const { path: filePath, content } = req.body; // filePath is relative to room root

    if (!filePath || content === undefined) {
        return res.status(400).json({ message: 'File path and content are required.' });
    }

    try {
        const result = await fileSystemService.writeFileContent(roomId, filePath, content);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating file content:', error);
        res.status(500).json({ message: error.message || 'Failed to update file content.' });
    }
};

// @desc    Delete a file or folder within a room
// @route   DELETE /api/rooms/:roomId/files
// @access  Private (members only)
export const deleteNode = async (req, res) => {
    const { roomId } = req.params;
    const { path: nodePath } = req.query; // nodePath is relative to room root

    if (!nodePath) {
        return res.status(400).json({ message: 'Path is required.' });
    }

    try {
        const result = await fileSystemService.deleteFileSystemNode(roomId, nodePath);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting file system node:', error);
        res.status(500).json({ message: error.message || 'Failed to delete node.' });
    }
};

// @desc    Upload a file to a room
// @route   POST /api/rooms/:roomId/upload
// @access  Private (members only)
export const uploadFileToRoom = [
    upload.single('file'), // Use multer middleware to handle single file upload
    async (req, res) => {
        const { roomId } = req.params;
        const { targetPath = '' } = req.body; // Optional path within the room to upload to

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        try {
            const result = await fileSystemService.uploadFile(roomId, req.file, targetPath);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error uploading file to room:', error);
            res.status(500).json({ message: error.message || 'Failed to upload file.' });
        }
    }
];
