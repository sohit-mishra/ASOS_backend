const Payment = require('../models/paymentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');

const validatePaymentInput = (amount, currency, paymentMethodId) => {
    if (!amount || !currency || !paymentMethodId) {
        throw new Error('Missing required fields: amount, currency, and paymentMethodId must be provided.');
    }
};

const createPayment = async (req, res) => {
    const { orderId, paymentMethodId, userId } = req.body;

    try {
        const orderExist = await Order.findById(orderId);

        if (!orderExist) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        const { totalPrice } = orderExist;

        validatePaymentInput(totalPrice, 'inr', paymentMethodId);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100, 
            currency: 'inr',
            payment_method: paymentMethodId,
            confirm: true,
        });

        const paymentRecord = await Payment.create({
            orderId: orderId,
            userId: userId,
            amount: totalPrice * 100,
            currency: 'inr',
            paymentMethodId: paymentMethodId,
            status: 'Completed',
        });

        orderExist.payment = 'Paid';
        await orderExist.save();

        res.status(201).json({ message: 'Payment processed successfully', order: orderExist, payment: paymentRecord });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyPayment = async (req, res) => {
    const { paymentMethodId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentMethodId);

        if (paymentIntent.status === 'succeeded') {
            res.status(200).json({
                message: 'Payment verified successfully',
                paymentIntent,
            });
        } else {
            res.status(400).json({
                message: `Payment not successful. Current status: ${paymentIntent.status}`,
                paymentIntent,
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPayment, verifyPayment };
