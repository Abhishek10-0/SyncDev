// codesync-backend/src/controllers/roomController.js
// Logic for creating, joining, listing, and managing rooms.
// Uses ES module syntax.

import Room from '../models/Room.js';
import User from '../models/User.js'; // To populate user details

// @desc    Create a new coding room
// @route   POST /api/rooms
// @access  Private (requires authentication)
export const createRoom = async (req, res) => {
    const { name, description, category, isPublic } = req.body;

    try {
        // Check if room with this name already exists
        const existingRoom = await Room.findOne({ name });
        if (existingRoom) {
            return res.status(400).json({ message: 'Room with this name already exists' });
        }

        // Create new room
        const room = await Room.create({
            name,
            description,
            category,
            owner: req.user._id, // Owner is the authenticated user
            members: [req.user._id], // Owner is automatically a member
            isPublic: isPublic !== undefined ? isPublic : true // Default to public if not specified
        });

        // Add room to user's created rooms (if we add a field in User model later)
        // For now, just respond with the room details
        res.status(201).json(room);

    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Server error creating room' });
    }
};

// @desc    Get all public rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req, res) => {
    try {
        // Find all public rooms and populate owner and members (lightly)
        const rooms = await Room.find({ isPublic: true })
            .populate('owner', 'username fullName avatar') // Only get specific fields from owner
            .populate('members', 'username avatar') // Only get specific fields from members
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json(rooms);

    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Server error fetching rooms' });
    }
};

// @desc    Get a single room by ID
// @route   GET /api/rooms/:id
// @access  Private (or Public if room is public)
export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate('owner', 'username fullName avatar')
            .populate('members', 'username avatar')
            .populate('activeUsers', 'username avatar');

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // If room is private, check if current user is a member or owner
        if (!room.isPublic && !room.members.some(member => member._id.equals(req.user._id)) && !room.owner.equals(req.user._id)) {
            return res.status(403).json({ message: 'Access denied to private room' });
        }

        res.status(200).json(room);
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        // Handle CastError if ID is invalid
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Room ID' });
        }
        res.status(500).json({ message: 'Server error fetching room' });
    }
};

// @desc    Join a room
// @route   POST /api/rooms/:id/join
// @access  Private
export const joinRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if user is already a member
        if (room.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already a member of this room' });
        }

        // Add user to members list
        room.members.push(req.user._id);
        await room.save();

        res.status(200).json({ message: 'Successfully joined room', room });

    } catch (error) {
        console.error('Error joining room:', error);
        res.status(500).json({ message: 'Server error joining room' });
    }
};

// @desc    Leave a room
// @route   POST /api/rooms/:id/leave
// @access  Private
export const leaveRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if user is a member
        if (!room.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'Not a member of this room' });
        }

        // Remove user from members list
        room.members = room.members.filter(
            (memberId) => memberId.toString() !== req.user._id.toString()
        );
        await room.save();

        res.status(200).json({ message: 'Successfully left room', room });

    } catch (error) {
        console.error('Error leaving room:', error);
        res.status(500).json({ message: 'Server error leaving room' });
    }
};

// @desc    Delete a room (only by owner)
// @route   DELETE /api/rooms/:id
// @access  Private (owner only)
export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Check if the authenticated user is the owner
        if (room.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this room' });
        }

        await room.deleteOne(); // Use deleteOne() for Mongoose 6+

        res.status(200).json({ message: 'Room deleted successfully' });

    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ message: 'Server error deleting room' });
    }
};
