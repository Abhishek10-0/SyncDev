// codesync-backend/src/routes/authRoutes.js
// API routes for user authentication.
// Uses ES module syntax.

import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

export default router;
