const express = require('express');

const router = express.Router();

// Get /user 라우터
router.get('/', (req, res) => {
    res.send("Hello, User");
});

router.get('/:number', (req, res) => {
    res.send(`Hello, User ${req.params.number}`);
    console.log(req.query);
});

module.exports = router;