const express = require('express');
const {
    createOrder, getUserAllOrder, updateOrderStatus 
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authmiddleware');

const router = express.Router();


router.post('/', protect, createOrder);
router.get('/:userId', protect, getUserAllOrder);
router.put('/:orderId/', protect, admin, updateOrderStatus);


module.exports = router;
