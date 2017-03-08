'use strict';
const express = require('express');
const config = require('../../config/environment');
const User = require('../user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local/index'));

module.exports = router;
