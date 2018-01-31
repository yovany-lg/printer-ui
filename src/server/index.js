const Express = require('express');
const path = require('path');

const wifiRoutes = require('./routes/wifi-routes');
const resetButton = require('./robotois-reset');
const command = require('./robotois-reset/commands');

const LEDStrip = require('robotois-ws2811');

const led = new LEDStrip();
const colors = {
  info: '#209cFe',
  success: '#38F87C',
  warning: '#F3B201',
  error: '#F34541',
};

resetButton.init();

const release = () => {
  resetButton.end();
  led.release();
  process.exit();
};

const app = new Express();

app.use(Express.static('build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/wifi', wifiRoutes);

app.get('/shutdown', (req, res) => {
  console.log('---> Robotois system going to shutdown...');
  release();
  command('sudo shutdown -h now');

  res.status(200).json({
    ok: 'ok',
  });
});

// listen
app.listen(80, () => {
  console.log('Printer UI listening on port 80');
  led.blink(colors.warning);
});


process.on('exit', () => {
  release();
});

process.on('SIGINT', () => {
  release();
});

process.on('SIGTERM', () => {
  release();
});
