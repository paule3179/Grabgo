const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const registerUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
}


const loginUser = async (username, email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return new Promise((resolve, reject) => {
        user.comparePassword(password, (err, isMatch) => {
            if (err) reject(err);
            if (!isMatch) reject(new Error('Invalid password'));
            const token = jwt.sign({ id: user._id, name:user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            resolve(token);
        });
    });
};

const updateUser = async (id, updateData) => {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const getUsers = async () => {
    const users = await User.find().select('-password');
    return users;
};

const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUsers,
    getUserById
};
