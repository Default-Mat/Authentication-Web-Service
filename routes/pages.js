const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('mainpage');
});

router.get('/signup-page', (req, res) => {
    res.render('signup');
});

router.get('/signin-page', (req, res) => {
    res.render('signin');
});

module.exports = router;