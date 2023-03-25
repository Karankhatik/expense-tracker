const express = require('express');
const router = express.Router();

console.log('router loaded');

router.use('/user', require('./user'));
router.use('/expense', require('./expense'));

module.exports = router;