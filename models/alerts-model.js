// models/alerts-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('./user-model');
const ClimbingRoutes = require('./climbingRoutes-model');

const alertsSchema = new Schema({
  alertType: String,
  description: String,
  date: String,
  climbingRoute: {type: Schema.Types.ObjectId, ref: 'ClimbingRoutes'},
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Alerts = mongoose.model('Alerts', alertsSchema);

module.exports = Alerts;
