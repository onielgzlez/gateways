const express = require('express');
const deviceRoute = express.Router();

//Device ctrl
const deviceCtrl = require('../controllers/devices');

//device routes
deviceRoute.route('/devices')
    .get(deviceCtrl.findAll)
    .post(deviceCtrl.addDevice);

deviceRoute.route("/devices/:id")
    .get(deviceCtrl.findById)
    .put(deviceCtrl.editDevice)
    .delete(deviceCtrl.removeDevice);
/*
//Add Device
deviceRoute.route('/create').post((req, res, next) => {
    Device.create(req.body, (error, data) => error ? next(error) : res.json(data))
})

// Get single Device
deviceRoute.route('/:id').get((req, res, next) => {
    Device.findById(req.params.id, (error, data) => error ? next(error) : res.json(data))
})

// Update Device
deviceRoute.route('/:id').put((req, res, next) => {
    Device.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => error ? next(error) : res.json(data))
})

// Delete Device
deviceRoute.route('/:id/delete').delete((req, res, next) => {
    Device.findOneAndRemove(req.params.id, (error, data) => error ? next(error) : res.json(data))
})
*/
module.exports = deviceRoute;