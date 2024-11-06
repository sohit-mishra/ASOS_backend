const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const allProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded."
        });
    }

    const { name, price, description, cost, category, stock } = req.body;

    if (!name || !price || !description || !cost || !category || !stock) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    const priceValue = parseFloat(price);
    const costValue = parseFloat(cost);
    const stockValue = parseInt(stock);

    if (isNaN(priceValue) || isNaN(costValue) || isNaN(stockValue)) {
        return res.status(400).json({
            success: false,
            message: "Price, cost, and stock must be valid numbers."
        });
    }

    try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);

        const newProduct = await Product.create({
            name,
            price: priceValue,
            description,
            image:uploadResult.secure_url,
            cost: costValue,
            category,
            stock: stockValue,
        });

        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            updatedProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { allProduct, createProduct, updateProduct, deleteProduct, getProductById };
