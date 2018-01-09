var PythonShell = require('python-shell');
var pyshell = new PythonShell('pytest.py');

const colors = {
  warning: [236, 51, 77],
  success: [11, 172, 69],
  printing: [80, 210, 192],
  off: [0, 0, 0]
};

pyshell.send(JSON.stringify({ color: colors.warning }));

setTimeout(() => {
  pyshell.send(JSON.stringify({ color: colors.success }));
}, 5000);

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});

setTimeout(() => {
  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
    if (err){
      throw err;
    }

    console.log('finished');
  });
}, 10000);
