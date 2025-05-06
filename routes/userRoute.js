const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel.js");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    // Check user is already exist or not
    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    // Generate Hashed Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    // Storing the user data in db
    user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).save();

    // Generating the Token for the user
    const token = await jwt.sign(user._id, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Sending the response
    res.status(200).json({ message: "User Created", token });
  } catch (error) {
    // Sending the Error Response
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    // Check user is already exist or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User does not Exists" });
    }

    // Validating the password
    const validatePassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    // Generate Token for the user
    const token = await jwt.sign(user._id, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Sending the response
    res.cookie("token", token);
    res.status(200).json({ message: "Logged In Successfully", token });
  } catch (error) {
    // Sending the Error Response
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = userRouter;
