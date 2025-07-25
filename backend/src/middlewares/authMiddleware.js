// codesync-backend/src/middlewares/authMiddleware.js
// Middleware to protect routes using JWT.
// Uses ES module syntax.

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/index.js'; // Import centralized config

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, config.jwtSecret);

            // Attach user to the request object (without password)
            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch (error) {
            console.error('Not authorized, token failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;
