const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
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
        tokens: [
            {
                _id: false,
                access: {
                    type: String,
                    required: true,
                },
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        admins: [
            {
                _id: false,
                sex: {
                    type: String,
                    required: true,
                },
                age: {
                    type: Number,
                    required: true,
                },
                from: {
                    type: String,
                    required: true,
                },
                price: {
                    type: String,
                    required: true,
                },
                access: {
                    type: Boolean,
                    default: true,
                },
                work: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);

userSchema.statics.findByCredentials = function (email, password) {
    let User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    if (user.email === 'pau.ahq@gmail.com') {
        access = 'admin';
    }
    let token = jwt
        .sign(
            {
                _id: user._id.toHexString(),
                access,
            },
            process.env.SECRET_KEY
        )
        .toString();

    user.tokens.push({ access, token });
    return user.save().then(() => {
        return { token, access };
    });
};

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
