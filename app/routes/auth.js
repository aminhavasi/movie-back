const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const User = require('./../db/user');
const persianDate = require('persian-date');
const _ = require('lodash');
persianDate.toLocale('en');
const date = new persianDate().format('YYYY/M/DD');
const registerValidator = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required().max(255),
        password: Joi.string().min(8).max(1024).required(),
    });

    return schema.validate(user);
};
const loginValidator = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(1024).required(),
    });
    return schema.validate(user);
};

router.post('/register', async (req, res) => {
    try {
        const { error } = await registerValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('this email is already exist');
        const body = _.pick(req.body, ['username', 'email', 'password']);
        body.date = date;
        const newUser = await new User(body);
        await newUser.save();
        res.send(newUser);
    } catch (err) {
        res.status(400).send('1111');
    }
});

router.post('/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const { error } = await loginValidator(body);

        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findByCredentials(body.email, body.password);
        let token = await user.generateAuthToken();
        res.header('x-auth', token).status(200).send(token);
    } catch (err) {
        res.status(400).json({
            Error: `Something went wrong. ${err}`,
        });
    }
});

module.exports = router;
