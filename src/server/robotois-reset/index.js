// const wifiConfig = require('../../../../wifi-config');
const command = require('./commands');
const Button = require('robotois-button');
// const ledColor = require('../ws2812/led');

const button = new Button(1);
let hrstart;
let hrend;

let buttonTask = false;

button.enableEvents();
const end = () => {
  button.removeAllListeners('change');
};

const resetFunction = (seconds, ms) => {
  switch (true) {
    // case seconds >= 2:
    //   console.log('---> Robotois enable Access Point...');
    //   end();
    //   wifiConfig.startAP('ImpresoraPosopto', '12345678');
    //   break;
    case (ms / 1000000) >= 100:
      console.log('---> Robotois system going to shutdown...');
      end();
      command('sudo shutdown -h now');
      break;
    default:
      buttonTask = false;
  }
};

const onChange = (value) => {
  if (!buttonTask) {
    if (value === 0) { // Inverted
      hrstart = process.hrtime();
      return;
    }

    if (hrstart !== undefined) {
      buttonTask = true;
      hrend = process.hrtime(hrstart);
      resetFunction(hrend[0], hrend[1]);
      hrstart = undefined;
      hrend = undefined;
      // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    }
  } else {
    console.log('Button task in process!!...');
  }
};

exports.init = () => {
  button.on('change', onChange);
};

exports.end = end;
