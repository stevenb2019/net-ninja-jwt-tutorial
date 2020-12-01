const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
/*
    This takes the json data sent with the post request
    and stores it in a javascript object (request object)
    that can be used by the route handlers.
*/
app.use(express.json());

app.set('view engine', 'ejs');

// Set up your database
const dbURI = 'mongodb+srv://steven:1234@cluster0.bgdyx.mongodb.net/jwt-tuts';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);