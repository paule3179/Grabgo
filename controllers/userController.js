const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const registerUser = (userData) => {
    const user = new User(userData);
    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return new Promise((resolve, reject) => {
        user.comparePassword(password, (err, isMatch) => {
            if (err) reject(err);
            if (!isMatch) reject(new Error('Invalid password'));
            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            resolve(token);
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};
