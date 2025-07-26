// codesync-backend/src/models/Room.js
// Mongoose schema for the Room model.
// Defines the structure of coding room documents in MongoDB.
// Uses ES module syntax.

import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    category: {
        type: String,
        required: true,
        enum: ['Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile', 'Community', 'Other'],
        default: 'Other'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Array of user IDs who are members
    }],
    activeUsers: [{ // Users currently active in the room (for real-time tracking)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isPublic: {
        type: Boolean,
        default: true // Public rooms can be browsed and joined by anyone
    },
    trending: {
        type: Boolean,
        default: false // Can be set based on activity or manually
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;
