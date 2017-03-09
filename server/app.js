'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/environment');
const http = require('http');

// Connect to MongoDB
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.connection.on('connected', function() {
    console.info('MongoDB connected');
});
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
