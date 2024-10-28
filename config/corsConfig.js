require('dotenv').config();
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: process.env.CORS_METHODS ? process.env.CORS_METHODS.split(',') : ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: process.env.CORS_CREDENTIALS === 'true'
};

module.exports = cors(corsOptions);
