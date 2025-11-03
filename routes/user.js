const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

//For registering a new user
router.post('/', upload.single('profilePicture'), async (req, res) => {
    try {
        const userData = req.body;
        const file = req.file;
        const user = await userController.registerUser(userData, file);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message:'User cannot be created',  error: error.message });
    }
});

// For user login
router.post('/login', async (req, res) => {  
    try {
        const {email, password } = req.body;
        const token = await userController.loginUser(email, password);
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }       
});

// For update user by id
router.put('/:id', require('../middleware/auth').authenticateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const file = req.file;
        const user = await userController.updateUser(id, updateData, file);
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
     router.get('/', authenticateToken, requireAdmin, async (req, res)=>{
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

     // Send OTP for phone verification
     router.post('/send-otp', async (req, res) => {
         try {
             const { phone } = req.body;
             const result = await userController.sendOTP(phone);
             res.json(result);
         } catch (error) {
             res.status(400).json({ message: error.message });
         }
     });

     // Verify OTP for phone verification
     router.post('/verify-otp', async (req, res) => {
         try {
             const { phone, otp } = req.body;
             const result = await userController.verifyOTP(phone, otp);
             res.json(result);
         } catch (error) {
             res.status(400).json({ message: error.message });
         }
     });

module.exports = router;
