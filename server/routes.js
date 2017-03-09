/**
 * Main application routes
 */

'use strict';

const errors = require('./components/errors');
const path = require('path');

module.exports = function(app) {
  // Insert routes below
  app.use('/api/user', require('./api/user'));

  app.use('/api/auth', require('./api/auth'));

  app.get('/api/health', (req, res) => res.status(200));
  app.get('/api/test', (req, res) => res.send('test'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);
}
