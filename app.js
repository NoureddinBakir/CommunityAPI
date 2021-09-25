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
const communityRoute = require('./routes/community');
const contactRoute = require('./routes/contacts');
const authRoute = require('./routes/auth');

//Middlewares, functions that run when specific routes are hit
app.use('/:communityId', communityRoute);
app.use('/contacts', contactRoute);
app.use('/auth', authRoute);

//Connect database
mongoose.connect(CONNECTION_URI)
        .then((conn)=>{console.log(`Connection Successful`)})
        .catch(err => console.log(err + "_Error not connected"));


//start listening
app.listen(PORT);
