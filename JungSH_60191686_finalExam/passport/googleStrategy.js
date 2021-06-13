// Import Modules
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
const User = require('../models/user');

// .env setting
dotenv.config();

// setting Google Strategy
module.exports = () => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const exUser = await User.findOne({
            where: { userID: profile.emails[0].value, provider: 'google'},
        });
        if (exUser) {
            done(null, exUser);
        } else {
          const newUser = await User.create({
            userID: profile.emails[0].value,
            name: profile.displayName,
            provider: 'google',
          });
          done(null, newUser);
        }
    } catch (err) {
      console.error(err);
      done(err);
    }
    }
  ));
};