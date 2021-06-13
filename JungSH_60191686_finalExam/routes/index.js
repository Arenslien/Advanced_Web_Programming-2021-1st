// Import Modules
const express = require('express');
const router = express.Router();
const path = require('path');

// Router Setting
router.use(async (req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Router about index
router.get('/', (req, res) => {
    if(req.user) {
        res.render('index');
    } else {
        res.redirect('auth/sign-in');
    }
});

module.exports = router;
