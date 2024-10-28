const Product = require('../models/productModel');
const cloudinaryConfig = require('../config/index');

const allProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, price, description, image, cost, category, stock } = req.body; 

    if (!image) {
        return res.status(400).json({ message: 'Image is required.' });
    }

    try {
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: 'products',
        });

        const newProduct = await Product.create({
            name,
            price,
            description,
            image: uploadResult.secure_url,
            cost,
            category,
            stock,
        });

        res.status(201).json({ newProduct });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { allProduct, createProduct, updateProduct, deleteProduct, getProductById };
