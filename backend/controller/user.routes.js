const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
require("dotenv").config()
const jwt = require('jsonwebtoken');
const {User} = require('../model/user.model');

userRouter.post('/signup', async (req, res) => {
  console.log("yesss")
  try {
    const { username,email, password} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hashed_password = bcrypt.hashSync(password, salt);
    const user = new User({ username,email, password: hashed_password});
    await user.save();
    res.status(200).json({ status:200,message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ status:500,message: 'Something went wrong' });
  }
});


userRouter.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password',status:401 });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Wrong password',status:401 });
      }
      console.log(process.env.JWT_SECRET)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });

      res.status(200).json({ status:200,message:"login successful",token,username:user.username});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong',status:500 });
    }
  });


  module.exports={
    userRouter
  }
