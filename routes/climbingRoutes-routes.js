// routes/task-routes.js

const express = require('express');
const mongoose = require('mongoose');
const ClimbingRoutes = require('../models/climbingRoutes-model');
const Zone = require('../models/zone-model');
const Alerts = require('../models/alerts-model')

const router  = express.Router();

//GET route => to get all the climbing routes of correspondant zone
router.get('/api/zones/:zoneId/climbingRoutes', (req, res, next) => {
  ClimbingRoutes.find({ zone: req.params.zoneId })
    .then(allTheZones => {
      res.json(allTheZones);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to retrieve a specific climbing route
router.get('/api/zones/:zoneId/climbingRoutes/:climbingRoutesId', (req, res, next) => {
  ClimbingRoutes.findById(req.params.climbingRoutesId)
  .then(theClimbingRoute =>{
      res.json(theClimbingRoute);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new climbing route
router.post('/api/climbingRoutes', (req, res, next)=>{
  
  ClimbingRoutes.create({
      name: req.body.name,
      sector: req.body.sector,  
      zone: req.body.zoneID,
      alerts: []
  })
    .then(response => {
      Zone.findByIdAndUpdate(req.body.zoneID, { $push:{ climbingRoutes: response._id } })
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

// PUT route => to update a specific climbing route
router.put('/api/climbingRoutes/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  ClimbingRoutes.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Task with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// // DELETE route => to delete a specific task
// router.delete('/api/climbingRoutes/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   ClimbingRoutes.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.json({ message: `Task with ${req.params.id} is removed successfully.` });
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })

module.exports = router;

