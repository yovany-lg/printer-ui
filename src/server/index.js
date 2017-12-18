const Express = require('express');
const logger = require('morgan');
const path = require('path');
// const React = require('react');

// const App = require('../components/App');
// const reducers = require('../reducers');
// const renderFullPage = require('./template');

const wifiRoutes = require('./routes/wifi-routes');
const resetButton = require('./robotois-reset');
const command = require('./robotois-reset/commands');

resetButton.init();

const app = new Express();

app.use(Express.static('build'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  // const store = createStore(reducers);
  //
  // const markup = renderToString(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // );
  //
  // const preloadedState = store.getState();
  //
  // res.send(renderFullPage(markup, preloadedState));
});

app.use(logger('tiny'));
app.use('/wifi', wifiRoutes);

app.get('/shutdown', (req, res) => {
  console.log('---> Robotois system going to shutdown...');
  command('sudo shutdown -h now');
  res.status(200).json({
    ok: 'ok',
  });
});

// listen
app.listen(8082);
console.log('listening on port 8082');
