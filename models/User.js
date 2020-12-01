const mongoose = require("mongoose");
const { isEmail } = require('validator');

 const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'The minimum password length is 6 characters']
    }
 });

 /*
    There are certain events that happen within mongo
    such as crud operations for example. Mongoose allows
    you to use hooks which peform certain code before or
    after particular Mongo events. 
 */

 // display user after saving to the database
 // You must call mongoose hooks on the schema whose events are being listened to
 // POST IS NOT REFERRING TO THE REQUEST TYPE BUT WHAT TO DO AFTER A MONGO EVENT
 // two parameters: event and callback function to perform
 userSchema.post('save', function(doc, next) {
    // doc the document passed to the callback function
    // after the document was successfully created and saved 

    console.log("Created and saved document", doc); 

    // You always call this at the end of a hook
    // next is what keeps the middleware moving along
    next();
 })

 // display user before saving to the database
 userSchema.pre('save', function(next) {
    // this refers to the local instance of the document instance
    // before it is saved to the database
    console.log("Display contents before saving", this);

    next();
 })


 const User = mongoose.model('user', userSchema);

 module.exports = User;