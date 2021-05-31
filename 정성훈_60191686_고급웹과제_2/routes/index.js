const express = require('express');
const User = require('../models/user');

const router = express.Router();

// 기본 '/'에 대한 Get 요청 처리
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('index', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;