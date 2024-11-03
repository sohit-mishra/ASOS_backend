const User = require('../models/userModel');
const Address = require('../models/addAddress');

const addAddress = async (req, res) => {
    const { userId } = req.params;
    const { street, city, state, country, postalCode } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const addressCount = await Address.find({ user: userId });

        if (addressCount.length >= 5) {
            return res.status(400).json({ message: 'Cannot add more than 5 addresses'});
        }

        const newAddress = new Address({ user: userId, street, city, state, country, postalCode });
        await newAddress.save();

        res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAddress = async (req, res) => {
    const { userId } = req.params;
    try {
        const userAddresses = await Address.find({user: userId});
        res.status(200).json({ addresses: userAddresses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { street, city, state, country, postalCode } = req.body;

    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            { street, city, state, country, postalCode },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteAddress = async (req, res) => {
    const { id } = req.params;

    try {
        const address = await Address.findByIdAndDelete(id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addAddress, updateAddress, deleteAddress, getAddress };
