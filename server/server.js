// required server modules
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const expressJwt = require('express-jwt');
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// middleware 
app.use(morgan('dev'));
app.use(express.json());

// telling app what to do
app.use('/api', expressJwt({ secret: process.env.SECRET }));

// connect to database
mongoose.connect('mongodb://localhost:27017/au', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to au database')
    })
    .catch(err => console.log(err));

// telling server what to do
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/timersRoute'));

// server listening
app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`);
});