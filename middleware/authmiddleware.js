const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/userModel');

const protect = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);

        req.User = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or Expired token' });
    }
};

const admin = (req, res, next) => {
    if (req.User && req.User.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, admin };
