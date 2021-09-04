//importing packages,files, etc.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

// JSON parser
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

//Import Routes
const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

//Middlewares, functions that run when specific routes are hit
app.use('/', postRoute);
app.use('/api/user', authRoute);


//Connect database
mongoose.connect(process.env.DB_CONNECTION)
        .then(()=>{console.log('Connected to database')})
        .catch(err => console.log(err + "_Error not connected"));


//start listening
app.listen(3000);