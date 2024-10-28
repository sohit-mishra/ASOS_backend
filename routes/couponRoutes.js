const express = require('express');
const {createCoupon, getAllCoupon, validateCoupon, deleteCoupon , updateCoupon} = require('../controllers/couponController');
const { protect,admin} = require('../middleware/authmiddleware');

const router = express.Router();


router.get('/:code' ,protect,  validateCoupon);  //user
router.post('/:userId' ,protect,admin, getAllCoupon);
router.post('/',protect, admin, createCoupon);
router.put('/:couponId',protect, admin, updateCoupon);
router.delete('/:couponId' ,protect, admin, deleteCoupon);


module.exports = router;