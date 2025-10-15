const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

//For registering a new user
router.post('/', async (req, res) => {  
    try {
        const userData = req.body;
        const user = await userController.registerUser(userData);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message:'User cannot be created',  error: error.message });
    }       
});

// For user login
router.post('/login', async (req, res) => {  
    try {
        const {username, email, password } = req.body;
        const token = await userController.loginUser(username,email, password);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }       
});

// For update user by id
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const user = await userController.updateUser(id, updateData);
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});
    // Get list of Users
     router.get('/', async (req, res)=>{
        try {
            const users = await userController.getUsers();
            res.json({ data: users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

     });

     // Get user by id
     router.get('/:id', async (req, res)=>{
        try {
            const { id } = req.params;
            const user = await userController.getUserById(id);
            res.json({ data: user });
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }

     });

module.exports = router;
