// codesync-frontend/src/api/fileApi.js
// API calls for file system operations within rooms.

import axios from 'axios';

const getAuthHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo && userInfo.token ? { Authorization: `Bearer ${userInfo.token}` } : {};
};

// @desc    List contents of a directory within a room
// @route   GET /api/rooms/:roomId/files?path=dir
export const listRoomContents = async (roomId, dirPath = '') => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms/${roomId}/files`,
      {
        params: { path: dirPath },
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error listing contents for room ${roomId} at path ${dirPath}:`, error);
    throw error;
  }
};

// @desc    Create a new file or folder within a room
// @route   POST /api/rooms/:roomId/files
export const createNode = async (roomId, nodePath, isFolder = false) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms/${roomId}/files`,
      { path: nodePath, isFolder },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error creating node for room ${roomId} at path ${nodePath}:`, error);
    throw error;
  }
};

// @desc    Read content of a file within a room
// @route   GET /api/rooms/:roomId/files/content?path=file
export const getFileContent = async (roomId, filePath) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms/${roomId}/files/content`,
      {
        params: { path: filePath },
        headers,
      }
    );
    return response.data; // This will be plain text content
  } catch (error) {
    console.error(`Error getting file content for room ${roomId} at path ${filePath}:`, error);
    throw error;
  }
};

// @desc    Update content of a file within a room
// @route   PUT /api/rooms/:roomId/files/content
export const updateFileContent = async (roomId, filePath, content) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms/${roomId}/files/content`,
      { path: filePath, content },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating file content for room ${roomId} at path ${filePath}:`, error);
    throw error;
  }
};

// @desc    Delete a file or folder within a room
// @route   DELETE /api/rooms/:roomId/files?path=node
export const deleteNode = async (roomId, nodePath) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms/${roomId}/files`,
      {
        params: { path: nodePath },
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting node for room ${roomId} at path ${nodePath}:`, error);
    throw error;
  }
};

// @desc    Upload a file to a room
// @route   POST /api/rooms/:roomId/upload
export const uploadFile = async (roomId, file, targetPath = '') => {
  try {
    const headers = getAuthHeaders();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetPath', targetPath);

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/rooms/${roomId}/files/upload`, // Note: Backend route is /api/rooms/:roomId/upload
      formData,
      {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error uploading file for room ${roomId}:`, error);
    throw error;
  }
};
