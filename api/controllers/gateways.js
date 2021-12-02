let Gateway = require("../models/gateway");
let Device = require("../models/device");

//GET - Return all Gateways
exports.findAll = (req, res, next) => {
    Gateway.find((_error, data) => res.json(data));
};

//GET - Return a Gateway with specified ID
exports.findById = (req, res, next) => {
    Gateway.findById(req.params.id, (error, data) => error ? next(error) : res.json(data));
};

//GET - Return devices from a gateway
exports.findDevicesById = async (req, res, next) => {
    let devices = await Gateway.findById(req.params.id).populate('devices')
    return res.json(devices);
};

//POST - Insert a new Gateway
exports.addGateway = async (req, res, next) => {
    const { serialNumber, name, ipv4, devices } = req.body;
    try {
        let gateway = new Gateway({ serialNumber, name, ipv4 });
        await gateway.save()
        if (devices) {
            if (Array.isArray(devices) && devices.length <= 10) {
                devices.forEach(async id => {
                    let device;
                    if (id.constructor === Object) {
                        device = await Device.create(id);
                    } else {
                        device = await Device.findById(id);
                    }
                  await gateway.devices.push(device);
                })
            } else next(new Error("devices must be less than 11"))
        }
       
        await gateway.save()
        return res.json(gateway)
    } catch (error) { next(error) }
};

//PUT - Update a Gateway with specified ID
exports.editGateway = async (req, res, next) => {
    const { serialNumber, name, ipv4, devices } = req.body;
    try {
        let gateway = await Gateway.findById(req.params.id);
        gateway.serialNumber = serialNumber;
        gateway.name = name;
        gateway.ipv4 = ipv4;
        if (devices) {
            if (Array.isArray(devices) && devices.length <= 10) {
                devices.forEach(async id => {
                    let device;
                    if (id.constructor === Object) {
                        device = await Device.create(id);
                    } else {
                        device = await Device.findById(id);
                    }
                    gateway.devices.push(device);
                })
            } else next(new Error("devices must be less than 11"))
        }
        await gateway.save();

        res.json(gateway)
    } catch (_error) { next(_error) }

};

//DELETE - Delete a Gateway with specified ID
exports.removeGateway = (req, res, next) => {
    Gateway.findOneAndRemove(req.params.id, (error, data) => error ? next(error) : res.json(data));
};