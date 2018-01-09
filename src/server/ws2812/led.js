const PythonShell = require('python-shell');

const colors = {
  warning: [236, 51, 77],
  success: [11, 172, 69],
  printing: [80, 210, 192],
  off: [0, 0, 0],
};

const ledColor = function ledColor(color, callback) {
  const options = {
    scriptPath: 'src/server/ws2812',
    args: JSON.stringify({ color: colors[color] }),
  };

  PythonShell.run('RGBLed.py', options, (err, results) => {
    if (err) console.error(err);
    callback();
  });
};

module.exports = ledColor;
