const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const validator = require('validator');

const userSchema = new Schema({     
    username: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 40
    },
    phone:{
        type: Number,
    },
    email: {
        type: String,       
        required: true,
        unique: true,   
        trim: true,
        lowercase: true,
        validate: { 
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'vendor'], 
    default: 'user' 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  permissions: {
    // Specific permissions for granular control
    canManageUsers: { type: Boolean, default: false },
    canManageProducts: { type: Boolean, default: false },
    canManageOrders: { type: Boolean, default: false },
    canManageContent: { type: Boolean, default: false }
  },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to hash password
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);      
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        }
        );
    });
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
const User = mongoose.model('User', userSchema);
module.exports = User;