const session = require('express-session')
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const loginRouter = require('./routes/login-routes');
const registerRouter = require('./routes/register-user');
const productRouter = require('./routes/menu-routes');
const cartRouter = require('./routes/cart-routes');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');

const store = new MongoDBStore({
    uri: process.env.DB_CONNECTION,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log('Session store error:', error);
});

const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: '.l,rtkdyfhgs.xdsdalkrdfgkcdhmsrfkx',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 365 * 24 * 60 * 60 * 1000
    }
}));

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
app.use('/menu', productRouter);
app.use('/cart', cartRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

console.log(process.env.DB_CONNECTION);