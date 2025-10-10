const User = require('../models/user');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', async (req, res) => {  
    try {
        const userData = req.body;
        const user = await userController.registerUser(userData);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }       
});

router.post('/login', async (req, res) => {  
    try {
        const { email, password } = req.body;
        const token = await userController.loginUser(email, password);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }       
});

module.exports = router; 
