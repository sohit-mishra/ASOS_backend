const express = require('express');
const {addAddress, updateAddress,deleteAddress,getAddress} = require('../controllers/addressController');
const {protect } = require('../middleware/authmiddleware');


const router = express.Router();

router.post('/:userId',protect,addAddress); 
router.get('/:userId',protect,getAddress); 
router.put('/:id',protect,updateAddress);
router.delete('/:id',protect,deleteAddress);

module.exports = router;