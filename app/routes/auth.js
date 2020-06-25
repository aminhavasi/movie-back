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
        username: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
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

module.exports = router;
