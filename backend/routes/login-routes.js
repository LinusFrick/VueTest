const express = require('express');
const loginRouter = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getHash = require('../utils/hash');
const cors = require('cors');

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

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
};

loginRouter.use(cors(corsOptions))

loginRouter.post('/', async (req, res) => {
  try {
    const data = await mongoose.models.users.findOne({
      username: req.body.username,
      password: getHash(req.body.password),
    });

    console.log("User data retrieved from the database:", data);

    if (data) {
      req.session.user = data;
      console.log("Session after login:", req.session);
      res.json({
        loggedIn: true,
        role: data.role,
        username: data.username,
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


loginRouter.get('/:id',async (req, res) => {
  console.log('Login request received.');
  console.log('Session before login:', req.session);
  const user = await mongoose.models.user.findById(req.params.id)
  res.json(user)
});



loginRouter.delete('/', async (req, res) => {
  delete req.session.user;
  res.json({ loggedIn: false });
});

module.exports = loginRouter;

