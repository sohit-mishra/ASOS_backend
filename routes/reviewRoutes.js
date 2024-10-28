const express =  require('express');
const { createReview, getReviewByProductId, deleteReview } = require('../controllers/reviewController');
const {protect} = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/:productId/:userId', protect, createReview);
router.get('/:productId', getReviewByProductId);
router.delete('/:id', protect, deleteReview);

module.exports = router;