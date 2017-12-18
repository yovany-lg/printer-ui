const { Gpio } = require('onoff');
const wifiConfig = require('wifi-config');
const command = require('./commands');
const Button = require('robotois-button');

// const button = new Gpio(23, 'in', 'both');
const button = new Button(1);
let hrstart;
let hrend;

button.enableEvents();

const resetFunction = (seconds, ms) => {
  // console.log('Time pressed:', seconds);
  switch (true) {
    case seconds >= 2:
      console.log('---> Robotois system going to shutdown...');
      command('sudo shutdown -h now');
      break;
    case ms / 1000000 >= 200:
      console.log('---> Robotois enable Access Point...');
      wifiConfig.startAP();
      break;
    default:
  }
};

const onChange = (value) => {
  if (value === 0) { // Inverted
    hrstart = process.hrtime();
  } else {
    if (hrstart !== undefined) {
      hrend = process.hrtime(hrstart);
      resetFunction(hrend[0], hrend[1]);
      hrstart = undefined;
      hrend = undefined;
      // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    }
  }
};

exports.init = () => {
  button.on('change', onChange);
  // button.watch((err, value) => {
  //   if (err) {
  //     throw err;
  //   }
  //
  //   if (value === 1) {
  //     hrstart = process.hrtime();
  //   } else {
  //     hrend = process.hrtime(hrstart);
  //     resetFunction(hrend[0], hrend[0]);
  //     hrstart = undefined;
  //     hrend = undefined;
  //     // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
  //   }
  // });
};
