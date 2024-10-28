const Order = require('../models/orderModel');
const Coupon = require('../models/couponModel');
const Offer = require('../models/offerModel');
const Cart = require('../models/cartModel');

const createOrder = async (req, res) => {
    const { userId, productList, discount, couponCode } = req.body;

    if (!userId || !productList) {
        return res.status(400).json({ message: "User ID and product list are required" });
    }

    try {
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        let totalPrice = 0;
        productList.forEach(product => {
            totalPrice += product.price * product.quantity;
        });

        let discountAmount = totalPrice * (discount / 100);
        let couponDiscount = 0;

        if (couponCode) {
            const coupon = await Coupon.findOne({ code: couponCode });
            if (coupon && coupon.isActive) {
                couponDiscount = coupon.value;
            }
        }

        const finalPrice = totalPrice - discountAmount - couponDiscount;

        const newOrder = await Order.create({ userId, productList, orderId, totalPrice: finalPrice, coupon: couponCode,discount : discountAmount });

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
        console.log(userOrders);
        if (userOrders.length > 0) {
            return res.status(200).json(userOrders);
        }
        res.status(404).json({ message: 'No orders found for this user.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createOrder, updateOrderStatus,getUserAllOrder };
