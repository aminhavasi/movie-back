const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const User = require('./../db/user');
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
        const newUser = await new User(req.body);
        await newUser.save();
        res.send(newUser);
    } catch (err) {
        res.status(400).send('1111');
    }
});

module.exports = router;
