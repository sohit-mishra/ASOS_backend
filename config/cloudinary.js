const cloudinary  = require('cloudinary').v2
require('dotenv').config();

cloudinary .config({
    accountSid: process.env.CLOUDINARY_CLOUD_NAME ,
    authToken:process.env.CLOUDINARY_API_KEY ,
    FormData :process.env.CLOUDINARY_API_SECRET ,
});

module.exports = cloudinary;