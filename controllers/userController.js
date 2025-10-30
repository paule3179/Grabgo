const User = require('../models/user');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const cloudinary = require('cloudinary').v2;

const JWT_SECRET = process.env.JWT_SECRET;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnac2xtzl',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

//reister user saved to db
const registerUser = async (userData, file) => {
    if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'profile_pictures',
            width: 300,
            height: 300,
            crop: 'fill'
        });
        userData.profilePicture = result.secure_url;
    }
    const user = new User(userData);
    await user.save();
    return user;
}


//login
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

const updateUser = async (id, updateData, file) => {
    if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'profile_pictures',
            width: 300,
            height: 300,
            crop: 'fill'
        });
        updateData.profilePicture = result.secure_url;
    }
    // If profilePicture is provided in updateData (e.g., as a URL), use it directly
    // This allows updating with a pre-uploaded URL or uploading a new file
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

const sendOTP = async (phone) => {
    const user = await User.findOne({ phone });
    if (!user) {
        throw new Error('User not found');
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: TWILIO_PHONE_NUMBER,
        to: phone
    });
    return { message: 'OTP sent successfully' };
};

const verifyOTP = async (phone, otp) => {
    const user = await User.findOne({ phone });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.otp !== otp || user.otpExpires < new Date()) {
        throw new Error('Invalid or expired OTP');
    }
    user.isPhoneVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    return { message: 'Phone verified successfully' };
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getUsers,
    getUserById,
    sendOTP,
    verifyOTP
};
