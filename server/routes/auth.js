// authRouter requirements
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
require("dotenv").config();

authRouter.post("/signup", (req, res) => {
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (existingUser !== null || err) {
      return res
        .status(400)
        .send({ success: false, err: "Username is already taken." });
    }
    const newUser = new User(req.body);
    return newUser.save((err, user) => {
      if (err) return res.status(500).send({ success: false, err });

      const token = jwt.sign(user.toObject(), process.env.SECRET);
      return res
        .status(201)
        .send({ success: true, user: user.withoutPassword(), token });
    });
  });
});

authRouter.post("/login", (req, res) => {
  if (req.body.username) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (!user || err) {
        return res
          .status(403)
          .send({ success: false, err: "Username or password is totes incorrect" });
      } else {
        user.checkPassword(req.body.password, (err, match) => {
          if (err) return res.status(500).send({ success: false, err });
          if (!match)
            return res.status(403).send({
              success: false,
              message: "Username or password is incorrect"
            });
          const token = jwt.sign(user.toObject(), process.env.SECRET, {
            expiresIn: "24hr"
          });
          return res.send({
            token,
            user: user.withoutPassword(),
            success: true,
            message: "You're in dawg"
          });
        });
      }
    });
  } else {
    return res
      .status(403)
      .send({ success: false, message: "Username and password required" });
  }
});

module.exports = authRouter;
