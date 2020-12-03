// Import express to be able to use the Router 
// Create routes for the authentication section of the web app

const { Router } = require('express');

const router = Router();

// import exported methods from authController
const authController = require('../controllers/authController')

// Create post and get requests for signup and login

router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

module.exports = router;

/*
    Do the get or post methods change the 
    router object such as the routes are created
    within the object? When the router is exported, 
    how are the methods exported and the corresponding 
    callback functions exported along with the router object?
*/