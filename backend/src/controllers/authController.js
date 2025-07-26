// codesync-backend/src/controllers/authController.js
// Logic for user authentication (signup, login) and JWT token management.
// Uses ES module syntax.

import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js'; // Import centralized config

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    const { username, email, password, fullName } = req.body;

    try {
        // Check if user already exists by email or username
        let user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return res.status(400).json({ message: 'User with that email or username already exists' });
        }

        // Create new user
        user = await User.create({
            username,
            email,
            password, // Password will be hashed by the pre-save hook in the User model
            fullName,
        });

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
