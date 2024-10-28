const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const CartItem = require('../models/cartModel');

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    try {
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const result = new CartItem({userId, productId, quantity })

        await result.save();
        res.status(200).json({ message: 'Product added to cart', cart: result });

    } catch (error) {
        console.error(`Error adding product to cart: ${error.message}`);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findById(id);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productCheck = Product.findById(productId);

        if (!productCheck) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.quantity = quantity;
        
        const updatedProduct = await Cart.findByIdAndUpdate(
            id,
            cart,
            { new: true, runValidators: true }
        );

        await updatedProduct.save();

        res.status(200).json({ message: 'Cart updated successfully', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





const removeItem = async(req,res)=>{
    const {id} = req.params;

    try {
        const CheckId = await Cart.findByIdAndDelete(id);

        if(!CheckId){
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Item removed from cart'});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const getCartItems = async(req,res)=>{
    const { userId } = req.params; 
    try {
        const cartItems = await Cart.find({ userId });
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No items found in the cart' });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = { addToCart, updateCartItem, removeItem, getCartItems};