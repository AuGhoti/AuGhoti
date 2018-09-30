// authRouter requirements
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
require('dotenv').config();

authRouter.post('/signup', (req, res) => {
    User.findOne({username: req.body.username}, (err, existingUser) => {
        // User already exists check
        if(existingUser !== null) {
            return res.status(400).send({success: false, err: 'Username is already taken.'});
        };
        const newUser = new User(req.body);
        console.log(newUser);
        return newUser.save((err, user) => {
            if(err) return res.status(500).send({success: false, err});
            
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(201).send({success: true, user: user.withoutPassword(), token });
        })
    })
})

authRouter.post('/login', (req,res) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(!user) {
            return res.send(403).send({success: false, err: "Username or password is incorrect"});
        } else {
            console.log(user);
            user.checkPassword(req.body.password, (err, match) => {
                if(err) return res.status(500).send({success: false, err});
                if(!match) return res.status(403).send({success: false, message: "Username or password is incorrecr"});
                const token = jwt.sign(user.toObject(), process.env.SECRET, {expiresIn: "24hr"});
                return res.send({token, user: user.withoutPassword(), success: true, message: "You're in dawg"});
            });
        };
    });
});

module.exports = authRouter;

