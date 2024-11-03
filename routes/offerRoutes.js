const express = require('express');
const { CreateOffer, getAllOffer, getOfferById, deleteOffer, UpdateOffer } = require('../controllers/offerController');
const { protect, admin } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', protect, admin, CreateOffer);
router.get('/', getAllOffer);//user
router.post('/:CreateId', getOfferById);
router.delete('/:id', protect, admin, deleteOffer);
router.put('/:id', protect, admin, UpdateOffer);


module.exports = router;
