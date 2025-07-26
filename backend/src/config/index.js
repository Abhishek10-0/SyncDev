// codesync-backend/src/config/index.js
// Centralized configuration for environment variables and other settings.
// Uses ES module syntax.

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const config = {
    port: process.env.PORT || 8000,
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    frontendURL: process.env.FRONTEND_URL || 'http://localhost:5173',
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    // Add other configurations as needed (e.g., WebRTC TURN/STUN servers)
};

export default config; // Use default export for ES modules
