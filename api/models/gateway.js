const mongoose = require('mongoose');
const net = require('net');
const Schema = mongoose.Schema;

const gatewaySchema = new Schema({
    serialNumber: { type: String, unique: true, required: [true, 'must be required'] },
    name: String,
    ipv4: { type: String, validate: [net.isIPv4, 'must be a valid ipv4'] },
    devices: [{ type: Schema.Types.ObjectId, ref: 'Device', required: false }]
})

gatewaySchema.pre("save", true, function (next, done) {
    var self = this;

    mongoose.models["Gateway"].findOne({ serialNumber: self.serialNumber }, function (err, ok) {
        if (err) {
            done(err);
        } else if (ok) { //there was a result found, so the serial number exists            
            if (ok.devices && ok.devices.length >= 10) {
                self.invalidate("devices", "devices must be less than 11");
                done(new Error("devices must be less than 11"));
            }            
            if (self._id.toString() !== ok._id.toString()) {
                self.invalidate("serialNumber", "serial number must be unique");
                done(new Error("serial number must be unique"));
            }
            done();
        } else {
            done();
        }
    });
    next();
});

gatewaySchema.pre('findById', function (next) {
    this.populate('devices');
    next();
});
gatewaySchema.pre('findOne', function (next) {
    this.populate('devices');
    next();
});
gatewaySchema.pre('find', function (next) {
    this.populate('devices');
    next();
});

module.exports = mongoose.model('Gateway', gatewaySchema)