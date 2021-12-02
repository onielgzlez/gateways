const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let deviceSchema = new Schema({
    uid: Number,
    vendor: String,
    createdAt: Date,
    status: {
        type: String,
        enum: ['online', 'offline']
    },    
})

module.exports = mongoose.model('Device', deviceSchema)