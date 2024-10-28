const Review = require('../models/reviewModel');

const createReview = async(req,res)=>{
    const {productId , userId} = req.params;
    const {comment} = req.body;

    try {
        const newReview = await Review.create({productId, userId, comment});

        res.status(201).json({newReview});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const getReviewByProductId = async(req,res)=>{
    const {productId} = req.params;

    try {
        const reviews = await Review.find({productId});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const deleteReview  = async(req,res)=>{
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' }); 
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

module.exports = {createReview, getReviewByProductId, deleteReview };