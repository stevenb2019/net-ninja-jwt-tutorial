const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    // duplicate error code
    if(err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

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
    catch (err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
        /*
        console.log(err);
        res.status(400).send('Error, user not created');
        */
    }
}

module.exports.login_post = async (req, res) => {
    // This is called destructuring
    const { email, password } = req.body;

    res.send(email + " " + password);
    //res.send('user logging in');
}

