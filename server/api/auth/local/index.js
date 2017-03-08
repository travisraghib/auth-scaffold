'use strict';

import express from 'express';
import passport from 'passport';
import { signToken } from '../auth.service';

var router = express.Router();

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    var error = err || info;

    if (error)return res.status(401).json(error);

    if (!user) return res.status(404).json({ message : 'Something went wrong, please try again.' });

    const token = signToken(user._id, user.role),
          profile = user.profile,
          registered = user.registered;

    res.json({ token, profile, registered });
  })(req, res, next);
});

export default router;