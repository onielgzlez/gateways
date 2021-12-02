let Device = require("../models/device");

//GET - Return all devices
exports.findAll = (req, res, next) => {
    Device.find((error, data) => error ? next(error) : res.json(data));
};

//GET - Return a device with specified ID
exports.findById = (req, res, next) => {
    Device.findById(req.params.id, (error, data) => error ? next(error) : res.json(data));
};

//POST - Insert a new device
exports.addDevice = (req, res, next) => {
    Device.create(req.body, (error, data) => error ? next(error) : res.json(data));
};

//PUT - Update a device with specified ID
exports.editDevice = (req, res, next) => {
    Device.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => error ? next(error) : res.json(data));
};

//DELETE - Delete a device with specified ID
exports.removeDevice = (req, res, next) => {
    Device.findOneAndRemove(req.params.id, (error, data) => error ? next(error) : res.json(data));
};