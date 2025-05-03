const mongoose = require('mongoose');
const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: 'Server error while fetching users' });
    }
};

const addUsers = async (req, res, next) => {
    const { name, email, age, address } = req.body;

    // Basic validation
    if (!name || !email || !age || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = new User({ name, email, age, address });
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.error('Error creating user:', err);
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'Email already exists' });
        }
        return res.status(500).json({ message: 'Server error while creating user' });
    }
};

// getById controller from above...

const getById = async(req, res, next) => {
    const id = req.params.id;
    
    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Server error while fetching user' });
    }
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, age, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, age, address },
            { new: true } // Return the updated document
        );
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Server error while updating user' });
    }
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ message: 'Server error while deleting user' });
    }
};

module.exports = {
    getAllUsers,
    addUsers,
    getById,
    updateUser,
    deleteUser
};