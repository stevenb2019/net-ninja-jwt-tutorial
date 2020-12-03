const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

/*
 The logic behind using this .pre hook for mongoose
 is to hash the password that is used to sign up for an account
 that a user provides. The salt is an extra string of characters
 added to the password before it is hashed as an extra level of security on
 top of the hashing. The salt is added to the password and the password passed into
 the hash function which generates the crazy string of characters.

 The utility of this, is that if someone breached the database, the passwords
 aren't just visible. The person will see the hashed passwords which are of no use.

 My only question is, how does the program remember the salt to use when a user trys to login?

 Also another point to make is that when a user logs in, the salt is appended to their
 password attempt and passed through the hashing function and checked with the user's record's 
 password to make sure the hashed passwords match. If so, the user is allowed to login.
*/


 // display user before saving to the database
 userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    // this refers to the local instance of the document instance
    // before it is saved to the database
    //console.log("Display contents before saving", this);

    next();
 })

 // static method to login user
 userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
         return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
 }


 const User = mongoose.model('user', userSchema);

 module.exports = User;