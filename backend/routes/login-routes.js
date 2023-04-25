const express = require('express');
const loginRouter = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getHash = require('../utils/hash');

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
});

mongoose.model('users', userSchema);

loginRouter.post('/', async (req, res) => {
  try {
    const data = await mongoose.models.users.findOne({
      username: req.body.username,
      password: getHash(req.body.password),
    });

    if (data) {
      req.session.user = data;
      res.json({
        loggedIn: true,
        role: data.role,
        message: `Welcome ${data.role === 'admin' ? 'Admin' : 'Customer'}`,
      });
    } else {
      delete req.session.user;
      res.json({ loggedIn: false });
    }
  } catch (err) {
    console.log('login error', err);
    res.status(500).json({
      loggedIn: false,
      message: 'Internal server error',
    });
  }
});

loginRouter.delete('/', async (req, res) => {
  delete req.session.user;
  res.json({ loggedIn: false });
});

module.exports = loginRouter;

