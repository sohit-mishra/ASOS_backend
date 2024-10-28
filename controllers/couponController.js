const Coupon = require('../models/couponModel');
const User = require('../models/userModel');


const validateCoupon = async (req, res) => {
    const { code } = req.params;

    try {
        const coupon = await Coupon.findOne({ code, isActive: true });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found or inactive' });
        }
        
        const expiryBuffer = 30 * 24 * 60 * 60 * 1000;

        if (new Date() > new Date(new Date(coupon.expiryDate).getTime() + expiryBuffer)) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }
        
        res.status(200).json({ message: 'Coupon is valid', discount: coupon.discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCoupon = async (req, res) => {
    const { userId } = req.params;

    try {
        const createCouponUserId = await User.findById(userId);
        if (!createCouponUserId) {
            return res.status(404).json({ message: "User not found" });
        }

        const coupons = await Coupon.find({ userId});
        
        if (coupons.length === 0) {
            return res.status(404).json({ message: "No active coupons found for this user." });
        }

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const createCoupon = async (req, res) => {
    const { code, discount, expiryDate, userId } = req.body;
    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const coupon = await Coupon.create({ code, discount, expiryDate, userId});
        res.status(201).json(coupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateCoupon = async (req, res) => {
    const { couponId } = req.params;
    const { code, discount, expiryDate, isActive } = req.body;

    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            { code, discount, expiryDate, isActive },
            { new: true, runValidators: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.status(200).json(updatedCoupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCoupon = async (req, res) => {
    const { couponId } = req.params;

    try {
        const coupon = await Coupon.findByIdAndDelete(couponId);
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createCoupon, getAllCoupon, validateCoupon, deleteCoupon ,updateCoupon};
