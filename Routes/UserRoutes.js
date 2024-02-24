const {SignUp, Login} = require('../Controller/UserController');
const express = require('express');

const router = express.Router();

router.post('/SignUp', SignUp);
router.post('/Login', Login);

module.exports = router;
