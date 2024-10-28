const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/jwt');

const tokenBlacklist = new Set();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, config.secret, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const PasswordValid = await existingUser.matchedPassword(password);
        if (!PasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(existingUser);

        const userResponse = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        };

        return res.status(200).json({ accessToken, refreshToken, user: userResponse });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong, please try again.' });
    }
};


const refreshToken = async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    const token = authHeader.split(' ')[1];

    if (tokenBlacklist.has(token)) {
        return res.status(403).json({ message: 'Refresh token has been blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, config.secret, { expiresIn: '15m' });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

const getUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {
    const authHeader = req.headers['authorization'];


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    const token = authHeader.split(' ')[1];
    if (token) {
        tokenBlacklist.add(token);
    }
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { signup, login, refreshToken, getUserProfile, updateUserProfile, logout };
