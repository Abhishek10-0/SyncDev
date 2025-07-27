// codesync-backend/src/sockets/roomSocket.js
// Socket.IO handlers for real-time code collaboration within rooms.
// FIX: Correctly receive and broadcast filePath for code changes.

import Room from '../models/Room.js'; // Import Room model if needed for room-specific logic

export const initializeRoomSockets = (io) => {
    io.on('connection', (socket) => {
        console.log(`Socket connected in roomSocket.js: ${socket.id}`);

        // Event for joining a specific room
        socket.on('join-room', async (roomId, userId) => {
            socket.join(roomId);
            console.log(`User ${userId} joined room: ${roomId}`);

            // Optional: Update activeUsers in DB (for presence)
            try {
                const room = await Room.findById(roomId);
                if (room && !room.activeUsers.includes(userId)) {
                    room.activeUsers.push(userId);
                    await room.save();
                    // Emit updated active users to everyone in the room
                    io.to(roomId).emit('room-users-update', room.activeUsers);
                }
            } catch (error) {
                console.error(`Error updating active users for room ${roomId}:`, error);
            }
        });

        // Event for code changes from the editor
        // Now expects roomId, filePath, and code
        socket.on('code-change', (roomId, filePath, code) => {
            // Broadcast the code change to all other clients in the same room
            // Include filePath in the broadcast
            socket.to(roomId).emit('code-change', roomId, filePath, code);
            console.log(`Code change in room ${roomId} for file ${filePath} by ${socket.id}`);
        });

        // Event for chat messages
        socket.on('chat-message', (roomId, messageData) => {
            // Broadcast the message to all clients in the same room
            io.to(roomId).emit('chat-message', messageData);
            console.log(`Chat message in room ${roomId}: ${messageData.text}`);
        });

        // Event when a user leaves the room (or disconnects)
        socket.on('leave-room', async (roomId, userId) => {
            socket.leave(roomId);
            console.log(`User ${userId} left room: ${roomId}`);

            // Optional: Remove user from activeUsers in DB
            try {
                const room = await Room.findById(roomId);
                if (room) {
                    room.activeUsers = room.activeUsers.filter(id => id.toString() !== userId);
                    await room.save();
                    io.to(roomId).emit('room-users-update', room.activeUsers);
                }
            } catch (error) {
                console.error(`Error removing active user for room ${roomId}:`, error);
            }
        });

        // Handle general socket disconnection
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};
