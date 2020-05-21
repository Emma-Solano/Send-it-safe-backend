// routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Zone = require('../models/zone-model');
const ClimbingRoutes = require('../models/climbingRoutes-model'); // <== !!!


// POST route => to create a new climbing zone
router.post('/api/zones', (req, res, next)=>{
  Zone.create({
    name: req.body.name,
    state: req.body.state,
    municipality: req.body.municipality,
    climbingRoutes: []
  })
  .then(response => {
  res.json(response);
  })
  .catch(err => {
  res.json(err);
  })
});

// GET route => to get all the climbing zones
router.get('/api/zones', (req, res, next) => {
  Zone.find().populate('ClimbingRoutes')
    .then(allTheZones => {
      res.json(allTheZones);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET route => to get a specific climbingRoute/detailed view
router.get('/api/zones/:id', (req, res, next)=>{
 
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  // our projects have array of tasks' ids and 
  // we can use .populate() method to get the whole task objects
  //                                   ^
  //                                   |
  //                                   |
  Zone.findById(req.params.id).populate('climbingRoutes')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})
 
// PUT route => to update a specific project
router.put('/api/zones/:id', (req, res, next)=>{
 
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Zone.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})
 
// // DELETE route => to delete a specific project
// router.delete('/api/projects/:id', (req, res, next)=>{
 
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }
 
//   Project.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.json({ message: `Project with ${req.params.id} is removed successfully.` });
//     })
//     .catch( err => {
//       res.json(err);
//     })
// })
 
module.exports = router;
