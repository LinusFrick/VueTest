const express = require('express');
const registerRouter = express.Router();
const mongoose = require('mongoose');
const getHash = require('../utils/hash');

registerRouter.post('/', async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if the user already exists
  const userExists = await mongoose.models.users.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    res.status(400).json({ message: 'User with the given username or email already exists' });
    return;
  }

  // Create a new user
  const newUser = new mongoose.models.users({
    username,
    email,
    password: getHash(password),
    role: role || 'customer', // Use the role from the request or default to 'customer'
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User successfully registered', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

module.exports = registerRouter;
