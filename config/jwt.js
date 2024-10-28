require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 123,
    expiresIn: '1h'
}