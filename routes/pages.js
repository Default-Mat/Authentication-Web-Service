const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try{
        let username = req.cookies.username;
        res.render('mainpage', {
            username: username
        });
    }
    catch(error){
        res.render('mainpage');
    }
});

router.get('/signup-page', (req, res) => {
    res.render('signup');
});

router.get('/signin-page', (req, res) => {
    res.render('signin');
});

module.exports = router;