const Order = require('../models/orderModel');
const Coupon = require('../models/couponModel');
const Offer = require('../models/offerModel');
const Cart = require('../models/cartModel');

const createOrder = async (req, res) => {
    const { userId, productList, discount, couponCode ,totalPrice} = req.body;

    try {
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
        const finalPrice = totalPrice;

        const newOrder = await Order.create({ userId, productList, orderId, totalPrice: finalPrice, coupon: couponCode,discount});

        productList.forEach(async (product) => {
            
            await Cart.findByIdAndDelete(product.productId);
        });
        
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserAllOrder = async (req, res) => {
    const { userId } = req.params;
    try {
        const userOrders = await Order.find({userId});
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createOrder, updateOrderStatus,getUserAllOrder };
