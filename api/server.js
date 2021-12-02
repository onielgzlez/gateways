
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config()

let dbConfig = require('./db');

// Express Route
const gatewayRoute = require('./routes/gateways')
const deviceRoute = require('./routes/devices')

// Connecting mongoDB Database
mongoose.connect(process.env.MONGO_URL || dbConfig.mongoUri, {
    useNewUrlParser: true,    
    useUnifiedTopology: true
})
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));
  
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', gatewayRoute)
app.use('/api', deviceRoute)

app.use('/', (req, res, next) => {
    res.send('Welcome to api')
})

// PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
    res.status(404).json({ "status": 404, "message": "Not found!" })
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ "status": err.statusCode, "message": err.message });
});