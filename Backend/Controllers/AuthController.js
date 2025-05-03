const User = require("../Model/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, age, address, role } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user with role
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            address,
            role: role || 'user' // Use provided role or default to 'user'
        });

        // Create token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                address: user.address,
                role: user.role
            },
            token 
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register, login };