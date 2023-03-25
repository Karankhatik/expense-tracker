const express = require('express');
const router = express.Router();

const usersController = require('../controller/user');

router.post('/create', usersController.createUser);
router.post('/sign-in',usersController.signIn);
router.get('/sign-out',)
module.exports = router;