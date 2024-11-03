const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinary');

const allProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, price, description, cost, category, stock } = req.body;
    

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image is required.' });
    }

    try {
        const imageUploadPromises = req.files.map(image => 
            cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                if (error) throw new Error(error);
                return result;
            }).end(image.buffer)
        );

        const uploadResults = await Promise.all(imageUploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);

        const newProduct = await Product.create({
            name,
            price,
            description,
            images: imageUrls,
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
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { allProduct, createProduct, updateProduct, deleteProduct, getProductById };
