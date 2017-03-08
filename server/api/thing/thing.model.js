'use strict';

const mongoose = require('mongoose';
const {registerEvents} = require('./thing.events';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ThingSchema);
export default mongoose.model('Thing', ThingSchema);
