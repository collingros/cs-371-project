var bluetooth = require('node-bluetooth');

const temp = require('./router/controllers/temp');

var device = new bluetooth.DeviceINQ();
const parser = require('body-parser');
const connect = require('./router/db/database');
const express = require('express');
const app = express();
app.use(parser.json());


/* Find bluetooth devices */

device
    .on('finished', console.log.bind(console, 'finished'))
    .on('found', function found(address, name) {
    console.log('Found: ' + address + ' with name ' + name);
}).scan();

device.findSerialPortChannel(address, function(channel){
    console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

    // make bluetooth connect to remote device
    bluetooth.connect(address, channel, function(err, connection){
        if(err) return console.error(err);

        console.log("A connection has been established");

        connection.on('data', (buffer) => {
            console.log('received message:', buffer.toString());
        });

        connection.on('celcius', (data) =>{

        });
        connection.on('farenheit', (data) =>{

        });

        connection.on('sensor.getTemp', (data) => {

        });

        connection.on('disconnect', (data) =>{

        });

        connection.set(' authentication', (data) => {

        });
    });
});

