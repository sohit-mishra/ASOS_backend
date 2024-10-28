const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Product'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0,
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0,
    },
    image: [
        {
            type: String,
        }
    ],
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    rating: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;