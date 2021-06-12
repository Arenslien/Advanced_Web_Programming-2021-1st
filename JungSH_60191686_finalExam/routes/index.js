const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.user) {
        res.render('index', { name: req.user.name });
    } else {
        res.redirect('auth/sign-in');
    }
});

module.exports = router;
