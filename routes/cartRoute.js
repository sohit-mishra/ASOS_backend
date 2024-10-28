const express = require('express');
const { addToCart, updateCartItem, removeItem, getCartItems} = require('../controllers/cartController');
const { protect} = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/:userId', protect , getCartItems );
router.put('/:id', protect ,updateCartItem);
router.delete('/:id', protect, removeItem);


module.exports = router;