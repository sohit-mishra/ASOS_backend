const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Order',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: 'inr',
        },
        paymentMethodId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed', 'Refunded'], 
            default: 'Pending',
        },
    },
    {
        timestamps: true, 
    }
);

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
