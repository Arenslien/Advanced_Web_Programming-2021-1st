const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in');
});

router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/sign-in',  
}));

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up');
});

router.post('/sign-up', async (req, res, next) => {
    const { name, id, password } = req.body;
    try {
        const exUser = await User.findOne( { where: { userID: id }});
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
           userID: id,
           name: name,
           password: hash, 
        });
        return res.redirect('/auth/sign-in');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/sign-in',}),
function(req, res) {
    res.redirect('/');
});

module.exports = router;