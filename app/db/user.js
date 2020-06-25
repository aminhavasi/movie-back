const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minlength: 3,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    { timestamps: true }
);
const User = mongoose.model('User', userSchema);

module.exports = User;
