const express = require('express');
const registerRouter = express.Router();
const mongoose = require('mongoose');
const getHash = require('../utils/hash');
const Cart = require('./cart-routes');

registerRouter.post('/', async (req, res) => {
  const { username, email, password, role } = req.body;
  const newCart = new Cart({ items: [] });
  newCart.save();
  
  const userExists = await mongoose.models.users.findOne({ $or: [{ username }, { email }] });

  if (userExists) {
    res.status(400).json({ message: 'User with the given username or email already exists' });
    return;
  }

  const newUser = new mongoose.models.users({
    username,
    email,
    password: getHash(password),
    role: role || 'customer',
    cart: newCart._id,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User successfully registered', user: savedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

module.exports = registerRouter;
