//importing packages,files, etc.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const CONNECTION_URI = process.env.DB_CONNECTION || 'mongodb://localhost';
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// JSON parser
app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(cors({origin: "*"}));

//Import Routes
const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

//Middlewares, functions that run when specific routes are hit
app.use('/', postRoute);
app.use('/api/user', authRoute);

//Connect database
mongoose.connect(CONNECTION_URI)
        .then(()=>{console.log('Connected to database')})
        .catch(err => console.log(err + "_Error not connected"));


//start listening
app.listen(PORT);
