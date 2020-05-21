// models/project-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('./user-model');
const ClimbingRoutes = require('./climbingRoutes-model');
 
const zoneSchema = new Schema({
  name: String,
  state: String,
  municipality: String,
  climbingRoutes: [{type: Schema.Types.ObjectId, ref: 'ClimbingRoutes'}]
});

const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;