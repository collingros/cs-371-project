const nrf24 = require('nrf24');

var rf24 = new nrf24.nRF24(22,1);
rf24.begin();