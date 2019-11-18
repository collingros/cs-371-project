var axios = require('axios');
var Gpio = require('onoff').Gpio; // require onoff to control GPIO
var fs = require('fs');
require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const router = require('./router/routes');
require('dotenv').config();

const compression = require('compression');
const connect = require('./router/db/database');
const app = express();
app.use(bodyparser.json());

// Declare GPIO

const http = require('http');
var socketioJwt = require('socketio-jwt');

app.use(compression());
// initialize routes
router(app);

// connect to mongo
connect.connect()
    .then(() => {
        http
            .createServer(app)
            .listen(process.env.PORT, () => {
                console.log("Listening on port " + process.env.PORT);
            });
    });

app.use('/', router(app));

var io = require('socket.io')(http);

io.set('login', socketioJwt.authorize({

}));


io.on('connection', (socket) => {
    // boolean value for button.
    var value = 0;
    var f = 0;
    var c = 0;
    console.log('A connection has been established.');
    // Read button input
    // watch for hardware interruptions
    /* button.watch(function (err, value) {
        if (err) {
        console.error('Error in reading button event', err);
        return;
        }
        value = value;
        socket.emit('Button pressed', value);
        });
     */

    // Receive reading every 1 second
    setInterval( () => {
        if (value === 1) {
            console.log('Calling sensors');
            socket.emit('sensor.getTemp', getTemp);
        }
    }, 1000);

    socket.on('celcius', (data) => {
        c = data;
    });

    socket.on('disconnect', () => {
        console.log('Disconnecting device');
        value = 0;
    });

    socket.on('sensor.getTemp', (data) => {
        value = data;
    });

});






