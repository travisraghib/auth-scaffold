'use strict';
import express from 'express';
import config from '../../config/environment';
import User from '../user/user.model';

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local/index').default);

export default router;