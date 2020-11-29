const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

// Set up your database
const dbURI = 'mongodb+srv://sbartkiewicz@gmail.com:Niners!1234@cluster0.bgdyx.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
