// models/task-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Zone = require('./zone-model');
const Alerts = require('./alerts-model');

const climbingRoutesSchema = new Schema({
  name: String,
  sector: String,
  zone: {type: Schema.Types.ObjectId, ref: 'Zone'},
  alerts: [{type: Schema.Types.ObjectId, ref: 'Alerts'}]
});

const ClimbingRoutes = mongoose.model('ClimbingRoutes', climbingRoutesSchema);

module.exports = ClimbingRoutes;
