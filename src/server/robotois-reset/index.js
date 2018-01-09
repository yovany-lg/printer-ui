// const { Gpio } = require('onoff');
const wifiConfig = require('../../wifi-config');
const command = require('./commands');
const Button = require('robotois-button');
const ledColor = require('../ws2812/led');

const button = new Button(1);
let hrstart;
let hrend;

button.enableEvents();

const resetFunction = (seconds, ms) => {
  switch (true) {
    case seconds >= 2:
      console.log('---> Robotois system going to shutdown...');
      ledColor('off', () => {
        // console.log('Led Done');
        command('sudo shutdown -h now');
      });
      break;
    case (ms / 1000000) >= 100:
      console.log('---> Robotois enable Access Point...');
      ledColor('off', () => {
        // console.log('Led Done');
        wifiConfig.startAP();
      });
      break;
    default:
  }
};

const onChange = (value) => {
  if (value === 0) { // Inverted
    hrstart = process.hrtime();
    return;
  }

  if (hrstart !== undefined) {
    hrend = process.hrtime(hrstart);
    resetFunction(hrend[0], hrend[1]);
    hrstart = undefined;
    hrend = undefined;
    // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  }
};

exports.init = () => {
  button.on('change', onChange);
};
