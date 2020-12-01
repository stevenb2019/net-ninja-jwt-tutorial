const User = require('../models/User');

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('signup');
}

// Make sure to say the function is asynchronous
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.create({ email, password });
        res.status(201).json(user);
    }
    catch{
        console.log(err);
        res.status(400).send('Error, user not created');
    }
}

module.exports.login_post = async (req, res) => {
    // This is called destructuring
    const { email, password } = req.body;

    res.send(email + " " + password);
    //res.send('user logging in');
}

