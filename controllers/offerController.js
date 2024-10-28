const Offer = require('../models/offerModel');

const CreateOffer = async (req, res) => {
    const { name, description, discount, products,startDate, endDate} = req.body;
    try {
        const newOffer = await Offer.create({  name, description, discount, products,startDate, endDate });
        res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllOffer = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOfferById = async (req, res) => {
    const { CreateId } = req.params; 
    try {
        const offer = await Offer.findById(CreateId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateOffer = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedOffer = await Offer.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteOffer = async (req, res) => {
    const { id } = req.params;
    try {
        const offer = await Offer.findByIdAndDelete(id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { CreateOffer, getAllOffer, getOfferById, deleteOffer,UpdateOffer };
