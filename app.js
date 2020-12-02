const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
/*
    This takes the json data sent with the post request
    and stores it in a javascript object (request object)
    that can be used by the route handlers.
*/
app.use(express.json());
app.use(cookieParser());

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

// cookies
/*
    When a request is made to a web server, the web server 
    will sometimes create cookies which store information 
    on the client's browser who is trying to access the website.
    These cookies hold information useful to the web server. The cookies
    only last for so long, certain properties can be defined for the cookies
    such as being deletd when the browser is closed or being saved indefinitely. 
    Cookies can be used for authentication, analytics, and other stuff.
*/
app.get('/set-cookies', (req, res) => {

    // One way to create cookie(s)
    //res.setHeader('Set-Cookie', 'newUser=true');

    // provide name value pair for cookie arguments
    res.cookie('newUser', true);
    
    // The third argument are the properties of the cookie
    // maxAge determines how long the cookie stays on the client's browser for (milliseconds)
    // secure: true means cookies can only be sent using https
    // httpOnly means that cookies can't be accessed by the front-end
    // try using document.cookie on inspect console to prove this
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

    res.send('you got the cookies!');

});

app.get('/get-cookies', (req, res) => {

    // another way (cookie-parser must be imported)
    const cookies = req.cookies;
    console.log(cookies);

    res.json(cookies);
});

/*
    JWT (JSON Web Tokens) Explained 

    When a user signs in to their account, a request is sent to the 
    server. The server takes this login/signup request and creates a
    cookie with a json web token that is used to authenicate access
    and behaviors from the user. Certain requests sent to the browser
    need to be authenticated with the json web token. 

    The json web token is created by generating a header which is essentially
    meta-data about the token, the payload which is the information about the 
    user, and the signature which is used as security to make sure the token 
    wasn't tampered with on the client side. 

    The nitty gritty details of it is that the request that is sent defines a
    header and payload which are encoded together. A secret that exists on the backend
    and is not supposed to be accessed or else the web server would be compromised is 
    used to generate a hash called with the signature combining the encoded values of 
    the header and payload along with the secret. This creates the format of 
    header.payload.signature which is the jwt. 

    jwt.io shows an example of the hashed values that are sent to and from the browser
    and what they actually represent.

    My only question is, why are signatures necessary, is it not possible to 
    just check the header and payload to see if they match since if the token 
    was tampered with that's where the tampering would have been done? 
*/