const session = require('express-session')
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const loginRouter = require('./routes/login-routes');
const registerRouter = require('./routes/register-user');

const app = express();

app.use(express.json());

app.use(session({
   secret: '.l,rtkdyfhgs.xdsdalkrdfgkcdhmsrfkx',
   resave: false,
   saveUninitialized: true,

   cookie: { 
      secure: false,
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000
   }  
}))

mongoose.connect(
    process.env.DB_CONNECTION, {
        usenewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log('succesfully connected to mongoDB')
}).catch(err => {
    console.log('error connecting to db', err)
    process.exit();
});

app.use('/login', loginRouter);
app.use('/register', registerRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

console.log(process.env.DB_CONNECTION);