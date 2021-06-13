const express = require('express');
const router = express.Router();
const path = require('path');

router.use(async (req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res) => {
    if(req.user) {
        res.render('index');
    } else {
        res.redirect('auth/sign-in');
    }
});

router.get('/uploads/:filename', (req, res) => {
    const { filename } = req.params;
    const file = path.join(__dirname, '../uploads/', filename);
    console.log(file);
    return res.sendFile(file);
})

module.exports = router;
