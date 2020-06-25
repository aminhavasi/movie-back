const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { has } = require('lodash');
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
        date: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
