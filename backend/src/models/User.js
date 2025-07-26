// codesync-backend/src/models/User.js
// Mongoose schema for the User model.
// Defines the structure of user documents in MongoDB.
// Uses ES module syntax.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    fullName: {
        type: String,
        required: false, // Full name can be optional initially
        trim: true
    },
    avatar: {
        type: String, // URL to avatar image
        default: 'https://placehold.co/150x150/000000/FFFFFF?text=JD' // Default placeholder image
    },
    bio: {
        type: String,
        maxlength: 500 // Max length for user bio
    },
    location: {
        type: String
    },
    githubProfile: {
        type: String // Link to GitHub profile
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash password before saving to database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
