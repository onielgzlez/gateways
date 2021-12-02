const express = require('express');
const gatewayRoute = express.Router();

const gatewayCtrl = require('../controllers/gateways');

//gateway routes
gatewayRoute.route('/gateways')
    .get(gatewayCtrl.findAll)
    .post(gatewayCtrl.addGateway);

gatewayRoute.route("/gateways/:id")
    .get(gatewayCtrl.findById)
    .put(gatewayCtrl.editGateway)
    .delete(gatewayCtrl.removeGateway);

gatewayRoute.route("/gateways/:id/devices").get(gatewayCtrl.findDevicesById)
/*
// Get single Gateway
gatewayRoute.route('/:id').get((req, res, next) => {
    Gateway.findById(req.params.id, (error, data) => error ? next(error) : res.json(data))
})

// Update Gateway
gatewayRoute.route('/:id').put((req, res, next) => {
    Gateway.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => error ? next(error) : res.json(data))
})

// Delete Gateway
gatewayRoute.route('/:id/delete').delete((req, res, next) => {
    Gateway.findOneAndRemove(req.params.id, (error, data) => error ? next(error) : res.json(data))
})*/

module.exports = gatewayRoute;