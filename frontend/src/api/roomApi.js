// codesync-frontend/src/api/roomApi.js
// API calls for room management.

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms`;

// Helper to get auth headers
const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo && userInfo.token ? { Authorization: `Bearer ${userInfo.token}` } : {};
};

// @desc    Get all public rooms
// @route   GET /api/rooms
export const getRooms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// @desc    Create a new room
// @route   POST /api/rooms
export const createRoom = async (roomData) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(API_URL, roomData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

// @desc    Join a room
// @route   POST /api/rooms/:id/join
export const joinRoom = async (roomId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(`${API_URL}/${roomId}/join`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error joining room ${roomId}:`, error);
    throw error;
  }
};

// @desc    Leave a room
// @route   POST /api/rooms/:id/leave
export const leaveRoom = async (roomId) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(`${API_URL}/${roomId}/leave`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error leaving room ${roomId}:`, error);
    throw error;
  }
};

// @desc    Get a single room by ID
// @route   GET /api/rooms/:id
export const getRoomById = async (roomId) => {
  try {
    const headers = getAuthHeaders(); // Even public rooms might need auth for detailed view
    const response = await axios.get(`${API_URL}/${roomId}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching room ${roomId}:`, error);
    throw error;
  }
};
