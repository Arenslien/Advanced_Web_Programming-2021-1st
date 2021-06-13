// Import Modules
const passport = require('passport');
const local = require('./localStrategy');
const google = require('./googleStrategy');
const User = require('../models/user');

// passport setting
module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userID);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({where: { userID: id }})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    google();
};