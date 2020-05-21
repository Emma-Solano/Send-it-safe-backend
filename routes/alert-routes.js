// routes/task-routes.js

const express = require('express');
const mongoose = require('mongoose');
const ClimbingRoutes = require('../models/climbingRoutes-model');
const Zone = require('../models/zone-model');
const Alerts = require('../models/alerts-model');

const router  = express.Router();

// GET route => to retrieve all alerts from a specific climbing Route
router.get('/api/climbingRoutes/:climbingRoutesId/alerts', (req, res, next) => {
  Alerts.find({ climbingRoute: req.params.climbingRoutesId }).populate('owner')
  .then(theAlert =>{
      res.json(theAlert);
  })
  .catch( err =>{
      res.json(err);
  })
});

// GET route => to retrieve a specific alert
router.get('/api/alertDetails/:alertId', (req, res, next) => {
  Alerts.findById(req.params.alertId).populate('owner')
  .then(theAlert =>{
      res.json(theAlert);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new alert
router.post('/api/alerts', (req, res, next)=>{
  
  Alerts.create({
      alertType: req.body.alertType,
      description: req.body.description,  
      date: req.body.date,
      climbingRoute: req.body.climbingRoute,
      owner: req.user._id
  })
    .then(response => {
      ClimbingRoutes.findByIdAndUpdate(req.body.climbingRoutesId, { $push:{ alerts: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific alert
router.put('/api/alerts/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Alerts.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific alert
router.delete('/api/alerts/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Alerts.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;