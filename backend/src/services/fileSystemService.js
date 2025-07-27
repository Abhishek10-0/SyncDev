// codesync-backend/src/services/fileSystemService.js
// Service layer for file system operations within rooms.
// Manages reading, writing, creating, and deleting files/folders.
// Fix: Ensure room-specific directory exists before creating files/folders.

import fs from 'fs/promises'; // Use fs.promises for async file operations
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base directory for all room files
// This will create a 'room_files' directory at the root of your backend project
const ROOM_FILES_BASE_DIR = path.join(__dirname, '../../room_files');

// Ensure the base directory exists when the service is loaded
const ensureBaseDirExists = async () => {
    try {
        await fs.mkdir(ROOM_FILES_BASE_DIR, { recursive: true });
        console.log(`Ensured base room files directory exists: ${ROOM_FILES_BASE_DIR}`);
    } catch (error) {
        console.error('Error ensuring base directory exists:', error);
    }
};

// Call this once when the service is initialized
ensureBaseDirExists();

// Helper to get the absolute path for a room's directory
const getRoomDirPath = (roomId) => {
    return path.join(ROOM_FILES_BASE_DIR, roomId);
};

// Helper to get the absolute path for a specific file/folder within a room
const getFilePath = (roomId, filePath) => {
    const roomDirPath = getRoomDirPath(roomId);
    // path.join handles normalization and prevents directory traversal attacks
    const absolutePath = path.join(roomDirPath, filePath);

    // Security check: Ensure the resolved path is within the room's directory
    if (!absolutePath.startsWith(roomDirPath)) {
        throw new Error('Attempted directory traversal detected!');
    }
    return absolutePath;
};

// Create a new file or folder
export const createFileSystemNode = async (roomId, nodePath, isFolder = false) => {
    const roomSpecificDirPath = getRoomDirPath(roomId); // Get the room's base directory
    await fs.mkdir(roomSpecificDirPath, { recursive: true }); // Ensure room's base directory exists

    const absolutePath = getFilePath(roomId, nodePath);
    try {
        if (isFolder) {
            await fs.mkdir(absolutePath, { recursive: true });
            return { message: 'Folder created successfully', path: nodePath };
        } else {
            // Ensure parent directories exist for the new file
            await fs.mkdir(path.dirname(absolutePath), { recursive: true });
            await fs.writeFile(absolutePath, ''); // Create an empty file
            return { message: 'File created successfully', path: nodePath };
        }
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error(`${isFolder ? 'Folder' : 'File'} '${nodePath}' already exists.`);
        }
        console.error(`Error creating ${isFolder ? 'folder' : 'file'} at ${absolutePath}:`, error);
        throw new Error(`Failed to create ${isFolder ? 'folder' : 'file'}.`);
    }
};

// Read file content
export const readFileContent = async (roomId, filePath) => {
    const absolutePath = getFilePath(roomId, filePath);
    try {
        const stats = await fs.stat(absolutePath);
        if (!stats.isFile()) {
            throw new Error('Path is not a file.');
        }
        const content = await fs.readFile(absolutePath, 'utf8');
        return content;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('File not found.');
        }
        console.error(`Error reading file ${absolutePath}:`, error);
        throw new Error('Failed to read file content.');
    }
};

// Write/update file content
export const writeFileContent = async (roomId, filePath, content) => {
    const absolutePath = getFilePath(roomId, filePath);
    try {
        // Ensure parent directories exist before writing
        await fs.mkdir(path.dirname(absolutePath), { recursive: true });
        await fs.writeFile(absolutePath, content, 'utf8');
        return { message: 'File updated successfully', path: filePath };
    } catch (error) {
        console.error(`Error writing file ${absolutePath}:`, error);
        throw new Error('Failed to write file content.');
    }
};

// Delete a file or folder
export const deleteFileSystemNode = async (roomId, nodePath) => {
    const absolutePath = getFilePath(roomId, nodePath);
    try {
        await fs.rm(absolutePath, { recursive: true, force: true }); // Use fs.rm for recursive delete
        return { message: 'Node deleted successfully', path: nodePath };
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Node not found.');
        }
        console.error(`Error deleting node ${absolutePath}:`, error);
        throw new Error('Failed to delete node.');
    }
};

// List contents of a directory
export const listDirectoryContents = async (roomId, dirPath = '') => {
    const absoluteDirPath = getFilePath(roomId, dirPath);
    try {
        const dirents = await fs.readdir(absoluteDirPath, { withFileTypes: true });
        const contents = dirents.map(dirent => ({
            name: dirent.name,
            isFolder: dirent.isDirectory(),
            path: path.join(dirPath, dirent.name) // Relative path
        }));
        return contents;
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If the room directory doesn't exist yet, return empty array
            console.log(`Directory for room ${roomId} at path ${dirPath} not found. Returning empty.`);
            return [];
        }
        console.error(`Error listing directory ${absoluteDirPath}:`, error);
        throw new Error('Failed to list directory contents.');
    }
};

// Upload a file (handles multipart form data in controller)
export const uploadFile = async (roomId, file, targetPath = '') => {
    const uploadDir = getFilePath(roomId, targetPath);
    try {
        await fs.mkdir(uploadDir, { recursive: true }); // Ensure target directory exists
        const filePath = path.join(uploadDir, file.originalname);
        await fs.writeFile(filePath, file.buffer); // Write the buffer to file
        return { message: 'File uploaded successfully', path: path.join(targetPath, file.originalname) };
    } catch (error) {
        console.error(`Error uploading file to ${uploadDir}:`, error);
        throw new Error('Failed to upload file.');
    }
};
