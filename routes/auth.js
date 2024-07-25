const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth');

router.post('/signup', auth_controller.signup);
router.post('/signin', auth_controller.signin);

module.exports = router;