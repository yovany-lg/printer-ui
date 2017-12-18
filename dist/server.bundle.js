/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shutdown = exports.createAP = exports.connectWifi = exports.resetWifi = exports.selectWifi = exports.fetchAvailableWifis = exports.devHost = exports.WIFI_CONFIG_RESET_WIFI = exports.WIFI_CONFIG_SELECTED_WIFI = exports.WIFI_CONFIG_RECEIVE_AVAILABLE = exports.WIFI_CONFIG_REQUEST_AVAILABLE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = __webpack_require__(19);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WIFI_CONFIG_REQUEST_AVAILABLE = exports.WIFI_CONFIG_REQUEST_AVAILABLE = 'WIFI_CONFIG_REQUEST_AVAILABLE';
var WIFI_CONFIG_RECEIVE_AVAILABLE = exports.WIFI_CONFIG_RECEIVE_AVAILABLE = 'WIFI_CONFIG_RECEIVE_AVAILABLE';
var WIFI_CONFIG_SELECTED_WIFI = exports.WIFI_CONFIG_SELECTED_WIFI = 'WIFI_CONFIG_SELECTED_WIFI';
var WIFI_CONFIG_RESET_WIFI = exports.WIFI_CONFIG_RESET_WIFI = 'WIFI_CONFIG_RESET_WIFI';
var devHost = exports.devHost = '192.168.1.70';

var requestAvailableWifis = function requestAvailableWifis() {
  return {
    type: WIFI_CONFIG_REQUEST_AVAILABLE
  };
};

var receiveAvailableWifis = function receiveAvailableWifis(wifis) {
  return {
    type: WIFI_CONFIG_RECEIVE_AVAILABLE,
    wifis: wifis
  };
};

var fetchAvailableWifis = exports.fetchAvailableWifis = function fetchAvailableWifis(hostIp) {
  return function (dispatch) {
    dispatch(requestAvailableWifis());
    return (0, _axios2.default)({
      method: 'get',
      url: 'http://' + hostIp + ':8082/wifi/all'
    }).then(function (res) {
      var networks = res.data.networks;
      // console.log('networks:', res);

      dispatch(receiveAvailableWifis(networks));
    }).catch(function (error) {
      console.log(error);
    });
  };
};

var selectWifi = exports.selectWifi = function selectWifi(wifi) {
  return {
    type: WIFI_CONFIG_SELECTED_WIFI,
    wifi: wifi
  };
};

var resetWifi = exports.resetWifi = function resetWifi() {
  return {
    type: WIFI_CONFIG_RESET_WIFI
  };
};

var connectWifi = exports.connectWifi = function connectWifi(hostIp, wifi) {
  return function (dispatch) {
    return (0, _axios2.default)({
      method: 'post',
      // baseURL: 'http://192.168.1.75:8082',
      url: 'http://' + hostIp + ':8082/wifi/connect',
      data: _extends({}, wifi)
    }).then(function (response) {
      console.log(response);
      dispatch(resetWifi());
    }).catch(function (error) {
      console.log(error);
    });
  };
};

var createAP = exports.createAP = function createAP(hostIp) {
  return (0, _axios2.default)({
    method: 'get',
    url: 'http://' + hostIp + ':8082/wifi/start-ap'
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
};

var shutdown = exports.shutdown = function shutdown(hostIp) {
  return (0, _axios2.default)({
    method: 'get',
    url: 'http://' + hostIp + ':8082/shutdown'
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(27),
    execSync = _require.execSync;

var execute = function execute(command) {
  execSync(command, function (error, stdout, stderr) {
    if (error) {
      console.error('exec error [' + command + ']: ' + error);
      return;
    }
    console.log('stdout [' + command + ']: ' + stdout);
    console.log('stderr [' + command + ']: ' + stderr);
  });
};

module.exports = execute;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("wifi-config");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _morgan = __webpack_require__(8);

var _morgan2 = _interopRequireDefault(_morgan);

var _path = __webpack_require__(9);

var _path2 = _interopRequireDefault(_path);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(10);

var _redux = __webpack_require__(4);

var _reactRedux = __webpack_require__(5);

var _App = __webpack_require__(11);

var _App2 = _interopRequireDefault(_App);

var _reducers = __webpack_require__(20);

var _reducers2 = _interopRequireDefault(_reducers);

var _template = __webpack_require__(22);

var _template2 = _interopRequireDefault(_template);

var _wifiRoutes = __webpack_require__(23);

var _wifiRoutes2 = _interopRequireDefault(_wifiRoutes);

var _robotoisReset = __webpack_require__(28);

var _robotoisReset2 = _interopRequireDefault(_robotoisReset);

var _commands = __webpack_require__(2);

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_robotoisReset2.default.init();

var app = new _express2.default();

app.use(_express2.default.static('build'));
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'index.html'));
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

app.use((0, _morgan2.default)('tiny'));
app.use('/wifi', _wifiRoutes2.default);

app.get('/shutdown', function (req, res) {
  console.log('---> Robotois system going to shutdown...');
  (0, _commands2.default)('sudo shutdown -h now');
  res.status(200).json({
    ok: 'ok'
  });
});

// listen
app.listen(8082);
console.log('listening on port 8082');
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _layout = __webpack_require__(12);

var _layout2 = _interopRequireDefault(_layout);

var _networksContainer = __webpack_require__(13);

var _networksContainer2 = _interopRequireDefault(_networksContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import logo from './logo.svg';
// import './App.css';

var App = function App() {
  return _react2.default.createElement(
    _layout2.default,
    null,
    _react2.default.createElement(_networksContainer2.default, null)
  );
};

exports.default = App;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = function Menu() {
  return _react2.default.createElement(
    "header",
    { className: "navbar col-9 centered my-2" },
    _react2.default.createElement(
      "section",
      { className: "navbar-section" },
      _react2.default.createElement(
        "a",
        { href: "#", className: "navbar-brand mr-2" },
        "Impresora POSOCTO"
      )
    )
  );
};

var Layout = function Layout(props) {
  return _react2.default.createElement(
    "div",
    { className: "container columns" },
    _react2.default.createElement(Menu, null),
    props.children
  );
};

exports.default = Layout;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux = __webpack_require__(5);

var _networks = __webpack_require__(14);

var _networks2 = _interopRequireDefault(_networks);

var _networksActions = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
  var networks = _ref.networks;
  return _extends({}, networks, {
    hostIp: _networksActions.devHost
  });
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchWifis: function fetchWifis(hostIp) {
      return dispatch((0, _networksActions.fetchAvailableWifis)(hostIp));
    },
    selectWifi: function selectWifi(wifi) {
      return function () {
        return dispatch((0, _networksActions.selectWifi)(wifi));
      };
    },
    changePwd: function changePwd(wifi) {
      return dispatch((0, _networksActions.selectWifi)(wifi));
    },
    connectWifi: function connectWifi(hostIp, wifi) {
      return dispatch((0, _networksActions.connectWifi)(hostIp, wifi));
    },
    resetWifi: function resetWifi() {
      return dispatch((0, _networksActions.resetWifi)());
    }
  };
};

var NetworksContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_networks2.default);

exports.default = NetworksContainer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _availableWifis = __webpack_require__(15);

var _availableWifis2 = _interopRequireDefault(_availableWifis);

var _wifiModal = __webpack_require__(18);

var _wifiModal2 = _interopRequireDefault(_wifiModal);

var _networksActions = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function Header(_ref) {
  var isFetching = _ref.isFetching,
      handleCreateAP = _ref.handleCreateAP,
      handleShutdown = _ref.handleShutdown,
      handleFetchWifis = _ref.handleFetchWifis;
  return _react2.default.createElement(
    'div',
    { className: 'tile' },
    _react2.default.createElement(
      'div',
      { className: 'tile-content' },
      _react2.default.createElement(
        'p',
        { className: 'tile-title h5' },
        'Configuraci\xF3n de la impresora'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'tile-action' },
      _react2.default.createElement(
        'button',
        { className: 'btn btn-primary m-1 ' + (isFetching ? 'loading' : ''), onClick: handleFetchWifis },
        'Buscar Redes WiFi'
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-primary m-1', onClick: handleCreateAP },
        'Crear Access Point'
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-link label label-warning m-1', onClick: handleShutdown },
        'Apagar'
      )
    )
  );
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.handleConnect = _this.handleConnect.bind(_this);
    _this.handleFetchWifis = _this.handleFetchWifis.bind(_this);
    _this.handleCreateAP = _this.handleCreateAP.bind(_this);
    _this.handleShutdown = _this.handleShutdown.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleFetchWifis();
    }
  }, {
    key: 'handleFetchWifis',
    value: function handleFetchWifis() {
      var _props = this.props,
          fetchWifis = _props.fetchWifis,
          hostIp = _props.hostIp;

      fetchWifis(hostIp);
    }
  }, {
    key: 'handleConnect',
    value: function handleConnect() {
      var _props2 = this.props,
          selectedWifi = _props2.selectedWifi,
          connectWifi = _props2.connectWifi,
          hostIp = _props2.hostIp;

      connectWifi(hostIp, selectedWifi);
    }
  }, {
    key: 'handleCreateAP',
    value: function handleCreateAP() {
      var hostIp = this.props.hostIp;

      (0, _networksActions.createAP)(hostIp);
    }
  }, {
    key: 'handleShutdown',
    value: function handleShutdown() {
      var hostIp = this.props.hostIp;

      (0, _networksActions.shutdown)(hostIp);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          wifis = _props3.wifis,
          isFetching = _props3.isFetching,
          selectedWifi = _props3.selectedWifi,
          selectWifi = _props3.selectWifi,
          changePwd = _props3.changePwd,
          selectedKit = _props3.selectedKit,
          resetWifi = _props3.resetWifi;
      // console.log('Kit:', this.props);

      return _react2.default.createElement(
        'div',
        { className: 'col-9 my-2 centered' },
        _react2.default.createElement(Header, {
          isFetching: isFetching,
          handleFetchWifis: this.handleFetchWifis,
          handleCreateAP: this.handleCreateAP,
          handleShutdown: this.handleShutdown
        }),
        _react2.default.createElement(_availableWifis2.default, {
          wifis: wifis,
          loading: isFetching,
          selectWifi: selectWifi
        }),
        selectedWifi && _react2.default.createElement(_wifiModal2.default, {
          selectedWifi: selectedWifi,
          changePwd: changePwd,
          handleConnect: this.handleConnect,
          handleClose: resetWifi
        })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _wifisList = __webpack_require__(16);

var _wifisList2 = _interopRequireDefault(_wifisList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AvailableWifis = function AvailableWifis(_ref) {
  var wifis = _ref.wifis,
      loading = _ref.loading,
      selectWifi = _ref.selectWifi;
  return _react2.default.createElement(
    'div',
    { className: 'card' },
    _react2.default.createElement(
      'div',
      { className: 'card-header' },
      _react2.default.createElement(
        'div',
        { className: 'card-title h4' },
        'Redes WiFi Disponibles'
      ),
      _react2.default.createElement('div', { className: 'divider' })
    ),
    _react2.default.createElement(
      'div',
      { className: 'card-body' },
      !loading ? _react2.default.createElement(_wifisList2.default, { wifis: wifis, selectWifi: selectWifi }) : _react2.default.createElement('div', { className: 'loading loading-lg' })
    )
  );
};

exports.default = AvailableWifis;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _wifi = __webpack_require__(17);

var _wifi2 = _interopRequireDefault(_wifi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderWifis = function RenderWifis(_ref) {
  var wifis = _ref.wifis,
      selectWifi = _ref.selectWifi;
  return _react2.default.createElement(
    'table',
    { className: 'table table-striped table-hover mx-2' },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Red'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Calidad'
        ),
        _react2.default.createElement(
          'th',
          { className: 'col-3 text-center' },
          'Opciones'
        )
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      wifis.map(function (wifi) {
        return _react2.default.createElement(_wifi2.default, {
          key: wifi.address,
          ssid: wifi.ssid,
          quality: wifi.quality,
          openModal: selectWifi({ ssid: wifi.ssid, pwd: '' })
        });
      })
    )
  );
};

var WifisList = function WifisList(_ref2) {
  var wifis = _ref2.wifis,
      selectWifi = _ref2.selectWifi;
  return wifis.length > 0 ? _react2.default.createElement(RenderWifis, { wifis: wifis, selectWifi: selectWifi }) : _react2.default.createElement(
    'div',
    { className: 'toast toas-warning' },
    'No hay redes disponibles...'
  );
};

exports.default = WifisList;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wifi = function Wifi(_ref) {
  var ssid = _ref.ssid,
      quality = _ref.quality,
      openModal = _ref.openModal;
  return _react2.default.createElement(
    "tr",
    null,
    _react2.default.createElement(
      "td",
      { className: "h6" },
      ssid
    ),
    _react2.default.createElement(
      "td",
      { className: "h6" },
      quality
    ),
    _react2.default.createElement(
      "td",
      { className: "col-3 text-center" },
      _react2.default.createElement(
        "button",
        {
          className: "btn btn-primary mx-1 tooltip",
          "data-tooltip": "Conectarse",
          onClick: openModal
        },
        _react2.default.createElement("i", { className: "icon icon-link" })
      )
    )
  );
};

exports.default = Wifi;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function Header(_ref) {
  var ssid = _ref.ssid,
      handleClose = _ref.handleClose;
  return _react2.default.createElement(
    "div",
    { className: "modal-header" },
    _react2.default.createElement("button", { className: "btn btn-clear float-right", onClick: handleClose }),
    _react2.default.createElement(
      "div",
      { className: "modal-title h5" },
      "Password para: ",
      "\"" + ssid + "\""
    )
  );
};

var Body = function Body(_ref2) {
  var pwd = _ref2.pwd,
      handleChangePwd = _ref2.handleChangePwd;
  return _react2.default.createElement(
    "div",
    { className: "modal-body" },
    _react2.default.createElement(
      "div",
      { className: "content" },
      _react2.default.createElement("input", {
        className: "form-input",
        type: "password",
        id: "wifi-pass",
        placeholder: "Password de la Red",
        onChange: handleChangePwd,
        value: pwd
      })
    )
  );
};

var Footer = function Footer(_ref3) {
  var handleConnect = _ref3.handleConnect;
  return _react2.default.createElement(
    "div",
    { className: "modal-footer" },
    _react2.default.createElement(
      "button",
      { className: "btn btn-primary", onClick: handleConnect },
      "Conectarse"
    )
  );
};

var WifiModal = function (_React$Component) {
  _inherits(WifiModal, _React$Component);

  function WifiModal() {
    _classCallCheck(this, WifiModal);

    var _this = _possibleConstructorReturn(this, (WifiModal.__proto__ || Object.getPrototypeOf(WifiModal)).call(this));

    _this.handleChangePwd = _this.handleChangePwd.bind(_this);
    return _this;
  }

  _createClass(WifiModal, [{
    key: "handleChangePwd",
    value: function handleChangePwd(ev) {
      var _props = this.props,
          selectedWifi = _props.selectedWifi,
          changePwd = _props.changePwd;

      changePwd(_extends({}, selectedWifi, { pwd: ev.target.value }));
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          selectedWifi = _props2.selectedWifi,
          handleConnect = _props2.handleConnect,
          handleClose = _props2.handleClose;

      return _react2.default.createElement(
        "div",
        { className: "modal active" },
        _react2.default.createElement("div", { className: "modal-overlay" }),
        _react2.default.createElement(
          "div",
          { className: "modal-container col-6" },
          _react2.default.createElement(Header, { ssid: selectedWifi.ssid, handleClose: handleClose }),
          _react2.default.createElement(Body, { pwd: selectedWifi.pwd, handleChangePwd: this.handleChangePwd }),
          _react2.default.createElement(Footer, { handleConnect: handleConnect })
        )
      );
    }
  }]);

  return WifiModal;
}(_react2.default.Component);

exports.default = WifiModal;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(4);

var _networksReducer = __webpack_require__(21);

var _networksReducer2 = _interopRequireDefault(_networksReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
  networks: _networksReducer2.default
});

exports.default = allReducers;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _networksActions = __webpack_require__(1);

var initialState = {
  selectedWifi: undefined,
  isFetching: false,
  wifis: []
};

var networkReducer = function networkReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _networksActions.WIFI_CONFIG_REQUEST_AVAILABLE:
      return {
        isFetching: true,
        wifis: [],
        selectedWifi: undefined
      };
    case _networksActions.WIFI_CONFIG_RECEIVE_AVAILABLE:
      return {
        isFetching: false,
        wifis: action.wifis,
        selectedWifi: undefined
      };
    case _networksActions.WIFI_CONFIG_SELECTED_WIFI:
      return _extends({}, state, {
        selectedWifi: action.wifi
      });
    case _networksActions.WIFI_CONFIG_RESET_WIFI:
      return _extends({}, state, {
        selectedWifi: undefined
      });
    default:
      return state;
  }
};

exports.default = networkReducer;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function renderFullPage(markup, preloadedState) {
  return '\n\n  <!DOCTYPE html>\n  <html lang="en">\n    <head>\n      <meta charset="utf-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n      <meta name="theme-color" content="#000000">\n      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">\n      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">\n      <title>React App</title>\n    </head>\n    <body>\n      <noscript>\n        You need to enable JavaScript to run this app.\n      </noscript>\n      <div id="root"' + markup + '></div>\n      <script>\n        // WARNING: See the following for security issues around embedding JSON in HTML:\n        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n        window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\u003c') + '\n      </script>\n    </body>\n  </html>\n    ';
}

module.exports = renderFullPage;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(3);
var bodyParser = __webpack_require__(24);
var os = __webpack_require__(25);

var _require = __webpack_require__(6),
    connectWifi = _require.connectWifi,
    startAP = _require.startAP;

var iwlist = __webpack_require__(26);
var command = __webpack_require__(2);

var router = express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/all', function (req, res) {
  iwlist.scan('wlan0', function (err, networks) {
    if (err) {
      console.error(err);
      res.status(404).json({
        message: 'Error reading wifis'
      });
      return;
    }
    console.log('iwlist all:', networks);
    res.status(200).json({
      networks: networks
    });
  });
});

router.post('/connect', function (req, res) {
  // const { id } = req.params;
  var _req$body = req.body,
      ssid = _req$body.ssid,
      pwd = _req$body.pwd;

  console.log(req.body);
  connectWifi(ssid, pwd);
  res.status(200).json({
    ok: true
  });
  setTimeout(function () {
    command('sudo shutdown -r now');
  }, 500);
});

router.get('/hostname', function (req, res) {
  var hostname = os.hostname();
  res.status(200).json({
    hostname: hostname
  });
});

router.get('/start-ap', function (req, res) {
  startAP();
  // const hostname = os.hostname();
  res.status(200).json({
    ok: 'ok'
  });
});

module.exports = router;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("wireless-tools/iwlist");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(29),
    Gpio = _require.Gpio;

var wifiConfig = __webpack_require__(6);
var command = __webpack_require__(2);

var button = new Gpio(4, 'in', 'both');

var hrstart = void 0;
var hrend = void 0;

var resetFunction = function resetFunction(seconds) {
  switch (true) {
    case seconds >= 3:
      console.log('---> Robotois system going to shutdown...');
      command('sudo shutdown -h now');
      break;
    default:
      console.log('---> Robotois enable Access Point...');
      wifiConfig.startAP();
  }
};

exports.init = function () {
  button.watch(function (err, value) {
    if (err) {
      throw err;
    }

    if (value === 1) {
      hrstart = process.hrtime();
    } else {
      hrend = process.hrtime(hrstart);
      resetFunction(hrend[0]);
      hrstart = undefined;
      hrend = undefined;
      // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    }
  });
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("onoff");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODllOTc3YWI0MTkzNGRiZDBiYjkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9uZXR3b3Jrcy1hY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm9ib3RvaXMtcmVzZXQvY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aWZpLWNvbmZpZ1wiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbGF5b3V0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL25ldHdvcmtzLWNvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uZXR3b3Jrcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uZXR3b3Jrcy9hdmFpbGFibGUtd2lmaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbmV0d29ya3Mvd2lmaXMtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uZXR3b3Jrcy93aWZpLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25ldHdvcmtzL3dpZmktbW9kYWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL25ldHdvcmtzLXJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3JvdXRlcy93aWZpLXJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2lyZWxlc3MtdG9vbHMvaXdsaXN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvcm9ib3RvaXMtcmVzZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib25vZmZcIiJdLCJuYW1lcyI6WyJXSUZJX0NPTkZJR19SRVFVRVNUX0FWQUlMQUJMRSIsIldJRklfQ09ORklHX1JFQ0VJVkVfQVZBSUxBQkxFIiwiV0lGSV9DT05GSUdfU0VMRUNURURfV0lGSSIsIldJRklfQ09ORklHX1JFU0VUX1dJRkkiLCJkZXZIb3N0IiwicmVxdWVzdEF2YWlsYWJsZVdpZmlzIiwidHlwZSIsInJlY2VpdmVBdmFpbGFibGVXaWZpcyIsIndpZmlzIiwiZmV0Y2hBdmFpbGFibGVXaWZpcyIsImRpc3BhdGNoIiwibWV0aG9kIiwidXJsIiwiaG9zdElwIiwidGhlbiIsInJlcyIsIm5ldHdvcmtzIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic2VsZWN0V2lmaSIsIndpZmkiLCJyZXNldFdpZmkiLCJjb25uZWN0V2lmaSIsInJlc3BvbnNlIiwiY3JlYXRlQVAiLCJzaHV0ZG93biIsInJlcXVpcmUiLCJleGVjU3luYyIsImV4ZWN1dGUiLCJjb21tYW5kIiwic3Rkb3V0Iiwic3RkZXJyIiwibW9kdWxlIiwiZXhwb3J0cyIsImluaXQiLCJhcHAiLCJ1c2UiLCJzdGF0aWMiLCJnZXQiLCJyZXEiLCJzZW5kRmlsZSIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzdGF0dXMiLCJqc29uIiwib2siLCJsaXN0ZW4iLCJBcHAiLCJNZW51IiwiTGF5b3V0IiwicHJvcHMiLCJjaGlsZHJlbiIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImZldGNoV2lmaXMiLCJjaGFuZ2VQd2QiLCJOZXR3b3Jrc0NvbnRhaW5lciIsIkhlYWRlciIsImlzRmV0Y2hpbmciLCJoYW5kbGVDcmVhdGVBUCIsImhhbmRsZVNodXRkb3duIiwiaGFuZGxlRmV0Y2hXaWZpcyIsImhhbmRsZUNvbm5lY3QiLCJiaW5kIiwic2VsZWN0ZWRXaWZpIiwic2VsZWN0ZWRLaXQiLCJDb21wb25lbnQiLCJBdmFpbGFibGVXaWZpcyIsImxvYWRpbmciLCJSZW5kZXJXaWZpcyIsIm1hcCIsImFkZHJlc3MiLCJzc2lkIiwicXVhbGl0eSIsInB3ZCIsIldpZmlzTGlzdCIsImxlbmd0aCIsIldpZmkiLCJvcGVuTW9kYWwiLCJoYW5kbGVDbG9zZSIsIkJvZHkiLCJoYW5kbGVDaGFuZ2VQd2QiLCJGb290ZXIiLCJXaWZpTW9kYWwiLCJldiIsInRhcmdldCIsInZhbHVlIiwiYWxsUmVkdWNlcnMiLCJpbml0aWFsU3RhdGUiLCJ1bmRlZmluZWQiLCJuZXR3b3JrUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwicmVuZGVyRnVsbFBhZ2UiLCJtYXJrdXAiLCJwcmVsb2FkZWRTdGF0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXBsYWNlIiwiZXhwcmVzcyIsImJvZHlQYXJzZXIiLCJvcyIsInN0YXJ0QVAiLCJpd2xpc3QiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJuZXh0IiwiaGVhZGVyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwic2NhbiIsImVyciIsIm1lc3NhZ2UiLCJwb3N0IiwiYm9keSIsInNldFRpbWVvdXQiLCJob3N0bmFtZSIsIkdwaW8iLCJ3aWZpQ29uZmlnIiwiYnV0dG9uIiwiaHJzdGFydCIsImhyZW5kIiwicmVzZXRGdW5jdGlvbiIsInNlY29uZHMiLCJ3YXRjaCIsInByb2Nlc3MiLCJocnRpbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSxrQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7QUFFTyxJQUFNQSx3RUFBZ0MsK0JBQXRDO0FBQ0EsSUFBTUMsd0VBQWdDLCtCQUF0QztBQUNBLElBQU1DLGdFQUE0QiwyQkFBbEM7QUFDQSxJQUFNQywwREFBeUIsd0JBQS9CO0FBQ0EsSUFBTUMsNEJBQVUsY0FBaEI7O0FBRVAsSUFBTUMsd0JBQXdCLFNBQXhCQSxxQkFBd0I7QUFBQSxTQUFPO0FBQ25DQyxVQUFNTjtBQUQ2QixHQUFQO0FBQUEsQ0FBOUI7O0FBSUEsSUFBTU8sd0JBQXdCLFNBQXhCQSxxQkFBd0I7QUFBQSxTQUFVO0FBQ3RDRCxVQUFNTCw2QkFEZ0M7QUFFdENPO0FBRnNDLEdBQVY7QUFBQSxDQUE5Qjs7QUFLTyxJQUFNQyxvREFBc0IsU0FBdEJBLG1CQUFzQjtBQUFBLFNBQVUsVUFBQ0MsUUFBRCxFQUFjO0FBQ3pEQSxhQUFTTCx1QkFBVDtBQUNBLFdBQU8scUJBQU07QUFDWE0sY0FBUSxLQURHO0FBRVhDLHVCQUFlQyxNQUFmO0FBRlcsS0FBTixFQUlKQyxJQUpJLENBSUMsVUFBQ0MsR0FBRCxF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QUNEO0FBQ0YsR0FkRDtBQWVELENBaEJELEM7Ozs7OztBQ3JCQSxrQyIsImZpbGUiOiJzZXJ2ZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODllOTc3YWI0MTkzNGRiZDBiYjkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IFdJRklfQ09ORklHX1JFUVVFU1RfQVZBSUxBQkxFID0gJ1dJRklfQ09ORklHX1JFUVVFU1RfQVZBSUxBQkxFJztcbmV4cG9ydCBjb25zdCBXSUZJX0NPTkZJR19SRUNFSVZFX0FWQUlMQUJMRSA9ICdXSUZJX0NPTkZJR19SRUNFSVZFX0FWQUlMQUJMRSc7XG5leHBvcnQgY29uc3QgV0lGSV9DT05GSUdfU0VMRUNURURfV0lGSSA9ICdXSUZJX0NPTkZJR19TRUxFQ1RFRF9XSUZJJztcbmV4cG9ydCBjb25zdCBXSUZJX0NPTkZJR19SRVNFVF9XSUZJID0gJ1dJRklfQ09ORklHX1JFU0VUX1dJRkknO1xuZXhwb3J0IGNvbnN0IGRldkhvc3QgPSAnMTkyLjE2OC4xLjcwJztcblxuY29uc3QgcmVxdWVzdEF2YWlsYWJsZVdpZmlzID0gKCkgPT4gKHtcbiAgdHlwZTogV0lGSV9DT05GSUdfUkVRVUVTVF9BVkFJTEFCTEUsXG59KTtcblxuY29uc3QgcmVjZWl2ZUF2YWlsYWJsZVdpZmlzID0gd2lmaXMgPT4gKHtcbiAgdHlwZTogV0lGSV9DT05GSUdfUkVDRUlWRV9BVkFJTEFCTEUsXG4gIHdpZmlzLFxufSk7XG5cbmV4cG9ydCBjb25zdCBmZXRjaEF2YWlsYWJsZVdpZmlzID0gaG9zdElwID0+IChkaXNwYXRjaCkgPT4ge1xuICBkaXNwYXRjaChyZXF1ZXN0QXZhaWxhYmxlV2lmaXMoKSk7XG4gIHJldHVybiBheGlvcyh7XG4gICAgbWV0aG9kOiAnZ2V0JyxcbiAgICB1cmw6IGBodHRwOi8vJHtob3N0SXB9OjgwODIvd2lmaS9hbGxgLFxuICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogeyBuZXR3b3JrcyB9IH0gPSByZXM7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbmV0d29ya3M6JywgcmVzKTtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVBdmFpbGFibGVXaWZpcyhuZXR3b3JrcykpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdFdpZmkgPSB3aWZpID0+ICh7XG4gIHR5cGU6IFdJRklfQ09ORklHX1NFTEVDVEVEX1dJRkksXG4gIHdpZmksXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlc2V0V2lmaSA9ICgpID0+ICh7XG4gIHR5cGU6IFdJRklfQ09ORklHX1JFU0VUX1dJRkksXG59KTtcblxuZXhwb3J0IGNvbnN0IGNvbm5lY3RXaWZpID0gKGhvc3RJcCwgd2lmaSkgPT4gZGlzcGF0Y2ggPT5cbiAgYXhpb3Moe1xuICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgIC8vIGJhc2VVUkw6ICdodHRwOi8vMTkyLjE2OC4xLjc1OjgwODInLFxuICAgIHVybDogYGh0dHA6Ly8ke2hvc3RJcH06ODA4Mi93aWZpL2Nvbm5lY3RgLFxuICAgIGRhdGE6IHsgLi4ud2lmaSB9LFxuICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgZGlzcGF0Y2gocmVzZXRXaWZpKCkpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQVAgPSBob3N0SXAgPT5cbiAgYXhpb3Moe1xuICAgIG1ldGhvZDogJ2dldCcsXG4gICAgdXJsOiBgaHR0cDovLyR7aG9zdElwfTo4MDgyL3dpZmkvc3RhcnQtYXBgLFxuICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuXG5leHBvcnQgY29uc3Qgc2h1dGRvd24gPSBob3N0SXAgPT5cbiAgYXhpb3Moe1xuICAgIG1ldGhvZDogJ2dldCcsXG4gICAgdXJsOiBgaHR0cDovLyR7aG9zdElwfTo4MDgyL3NodXRkb3duYCxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hY3Rpb25zL25ldHdvcmtzLWFjdGlvbnMuanMiLCJjb25zdCB7IGV4ZWNTeW5jIH0gPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5cbmNvbnN0IGV4ZWN1dGUgPSAoY29tbWFuZCkgPT4ge1xuICBleGVjU3luYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBleGVjIGVycm9yIFske2NvbW1hbmR9XTogJHtlcnJvcn1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYHN0ZG91dCBbJHtjb21tYW5kfV06ICR7c3Rkb3V0fWApO1xuICAgIGNvbnNvbGUubG9nKGBzdGRlcnIgWyR7Y29tbWFuZH1dOiAke3N0ZGVycn1gKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4ZWN1dGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VydmVyL3JvYm90b2lzLXJlc2V0L2NvbW1hbmRzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlZHV4XCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpZmktY29uZmlnXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2lmaS1jb25maWdcIlxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnbW9yZ2FuJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgQXBwIGZyb20gJy4uL2NvbXBvbmVudHMvQXBwJztcbmltcG9ydCByZWR1Y2VycyBmcm9tICcuLi9yZWR1Y2Vycyc7XG5pbXBvcnQgcmVuZGVyRnVsbFBhZ2UgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmltcG9ydCB3aWZpUm91dGVzIGZyb20gJy4vcm91dGVzL3dpZmktcm91dGVzJztcbmltcG9ydCByZXNldEJ1dHRvbiBmcm9tICcuL3JvYm90b2lzLXJlc2V0JztcbmltcG9ydCBjb21tYW5kIGZyb20gJy4vcm9ib3RvaXMtcmVzZXQvY29tbWFuZHMnO1xuXG5yZXNldEJ1dHRvbi5pbml0KCk7XG5cbmNvbnN0IGFwcCA9IG5ldyBFeHByZXNzKCk7XG5cbmFwcC51c2UoRXhwcmVzcy5zdGF0aWMoJ2J1aWxkJykpO1xuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSk7XG4gIC8vIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcnMpO1xuICAvL1xuICAvLyBjb25zdCBtYXJrdXAgPSByZW5kZXJUb1N0cmluZyhcbiAgLy8gICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgLy8gICAgIDxBcHAgLz5cbiAgLy8gICA8L1Byb3ZpZGVyPlxuICAvLyApO1xuICAvL1xuICAvLyBjb25zdCBwcmVsb2FkZWRTdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gIC8vXG4gIC8vIHJlcy5zZW5kKHJlbmRlckZ1bGxQYWdlKG1hcmt1cCwgcHJlbG9hZGVkU3RhdGUpKTtcbn0pO1xuXG5hcHAudXNlKGxvZ2dlcigndGlueScpKTtcbmFwcC51c2UoJy93aWZpJywgd2lmaVJvdXRlcyk7XG5cbmFwcC5nZXQoJy9zaHV0ZG93bicsIChyZXEsIHJlcykgPT4ge1xuICBjb25zb2xlLmxvZygnLS0tPiBSb2JvdG9pcyBzeXN0ZW0gZ29pbmcgdG8gc2h1dGRvd24uLi4nKTtcbiAgY29tbWFuZCgnc3VkbyBzaHV0ZG93biAtaCBub3cnKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIG9rOiAnb2snLFxuICB9KTtcbn0pO1xuXG4vLyBsaXN0ZW5cbmFwcC5saXN0ZW4oODA4Mik7XG5jb25zb2xlLmxvZygnbGlzdGVuaW5nIG9uIHBvcnQgODA4MicpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm1vcmdhblwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZG9tL3NlcnZlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IE5ldHdvcmtzQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lcnMvbmV0d29ya3MtY29udGFpbmVyJztcbi8vIGltcG9ydCBsb2dvIGZyb20gJy4vbG9nby5zdmcnO1xuLy8gaW1wb3J0ICcuL0FwcC5jc3MnO1xuXG5jb25zdCBBcHAgPSAoKSA9PiAoXG4gIDxMYXlvdXQgPlxuICAgIDxOZXR3b3Jrc0NvbnRhaW5lciAvPlxuICA8L0xheW91dD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IE1lbnUgPSAoKSA9PiAoXG4gIDxoZWFkZXIgY2xhc3NOYW1lPVwibmF2YmFyIGNvbC05IGNlbnRlcmVkIG15LTJcIj5cbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJuYXZiYXItc2VjdGlvblwiPlxuICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmQgbXItMlwiPkltcHJlc29yYSBQT1NPQ1RPPC9hPlxuICAgIDwvc2VjdGlvbj5cbiAgPC9oZWFkZXI+XG4pO1xuXG5jb25zdCBMYXlvdXQgPSBwcm9wcyA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGNvbHVtbnNcIj5cbiAgICA8TWVudSAvPlxuICAgICAge3Byb3BzLmNoaWxkcmVufVxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IExheW91dDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL2xheW91dC5qcyIsImltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgTmV0d29ya3MgZnJvbSAnLi4vY29tcG9uZW50cy9uZXR3b3Jrcyc7XG5pbXBvcnQgeyBmZXRjaEF2YWlsYWJsZVdpZmlzLCBzZWxlY3RXaWZpLCBjb25uZWN0V2lmaSwgcmVzZXRXaWZpLCBkZXZIb3N0IH0gZnJvbSAnLi4vYWN0aW9ucy9uZXR3b3Jrcy1hY3Rpb25zJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgbmV0d29ya3MgfSkgPT4gKHtcbiAgLi4ubmV0d29ya3MsXG4gIGhvc3RJcDogZGV2SG9zdCxcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiAoe1xuICBmZXRjaFdpZmlzOiBob3N0SXAgPT4gZGlzcGF0Y2goZmV0Y2hBdmFpbGFibGVXaWZpcyhob3N0SXApKSxcbiAgc2VsZWN0V2lmaTogd2lmaSA9PiAoKSA9PiBkaXNwYXRjaChzZWxlY3RXaWZpKHdpZmkpKSxcbiAgY2hhbmdlUHdkOiB3aWZpID0+IGRpc3BhdGNoKHNlbGVjdFdpZmkod2lmaSkpLFxuICBjb25uZWN0V2lmaTogKGhvc3RJcCwgd2lmaSkgPT4gZGlzcGF0Y2goY29ubmVjdFdpZmkoaG9zdElwLCB3aWZpKSksXG4gIHJlc2V0V2lmaTogKCkgPT4gZGlzcGF0Y2gocmVzZXRXaWZpKCkpLFxufSk7XG5cbmNvbnN0IE5ldHdvcmtzQ29udGFpbmVyID0gY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKE5ldHdvcmtzKTtcblxuZXhwb3J0IGRlZmF1bHQgTmV0d29ya3NDb250YWluZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFpbmVycy9uZXR3b3Jrcy1jb250YWluZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEF2YWlsYWJsZVdpZmlzIGZyb20gJy4vYXZhaWxhYmxlLXdpZmlzJztcbmltcG9ydCBXaWZpTW9kYWwgZnJvbSAnLi93aWZpLW1vZGFsJztcbmltcG9ydCB7IGNyZWF0ZUFQLCBzaHV0ZG93biB9IGZyb20gJy4uLy4uL2FjdGlvbnMvbmV0d29ya3MtYWN0aW9ucyc7XG5cbmNvbnN0IEhlYWRlciA9ICh7IGlzRmV0Y2hpbmcsIGhhbmRsZUNyZWF0ZUFQLCBoYW5kbGVTaHV0ZG93biwgaGFuZGxlRmV0Y2hXaWZpcyB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwidGlsZVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGlsZS1jb250ZW50XCI+XG4gICAgICA8cCBjbGFzc05hbWU9XCJ0aWxlLXRpdGxlIGg1XCI+Q29uZmlndXJhY2nDs24gZGUgbGEgaW1wcmVzb3JhPC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGlsZS1hY3Rpb25cIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgYnRuIGJ0bi1wcmltYXJ5IG0tMSAke2lzRmV0Y2hpbmcgPyAnbG9hZGluZycgOiAnJ31gfSBvbkNsaWNrPXtoYW5kbGVGZXRjaFdpZmlzfT5CdXNjYXIgUmVkZXMgV2lGaTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgbS0xXCIgb25DbGljaz17aGFuZGxlQ3JlYXRlQVB9PkNyZWFyIEFjY2VzcyBQb2ludDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWxpbmsgbGFiZWwgbGFiZWwtd2FybmluZyBtLTFcIiBvbkNsaWNrPXtoYW5kbGVTaHV0ZG93bn0+QXBhZ2FyPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmhhbmRsZUNvbm5lY3QgPSB0aGlzLmhhbmRsZUNvbm5lY3QuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZldGNoV2lmaXMgPSB0aGlzLmhhbmRsZUZldGNoV2lmaXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNyZWF0ZUFQID0gdGhpcy5oYW5kbGVDcmVhdGVBUC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlU2h1dGRvd24gPSB0aGlzLmhhbmRsZVNodXRkb3duLmJpbmQodGhpcyk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5oYW5kbGVGZXRjaFdpZmlzKCk7XG4gIH1cblxuICBoYW5kbGVGZXRjaFdpZmlzKCkge1xuICAgIGNvbnN0IHsgZmV0Y2hXaWZpcywgaG9zdElwIH0gPSB0aGlzLnByb3BzO1xuICAgIGZldGNoV2lmaXMoaG9zdElwKTtcbiAgfVxuXG4gIGhhbmRsZUNvbm5lY3QoKSB7XG4gICAgY29uc3QgeyBzZWxlY3RlZFdpZmksIGNvbm5lY3RXaWZpLCBob3N0SXAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29ubmVjdFdpZmkoaG9zdElwLCBzZWxlY3RlZFdpZmkpO1xuICB9XG5cbiAgaGFuZGxlQ3JlYXRlQVAoKSB7XG4gICAgY29uc3QgeyBob3N0SXAgfSA9IHRoaXMucHJvcHM7XG4gICAgY3JlYXRlQVAoaG9zdElwKTtcbiAgfVxuXG4gIGhhbmRsZVNodXRkb3duKCkge1xuICAgIGNvbnN0IHsgaG9zdElwIH0gPSB0aGlzLnByb3BzO1xuICAgIHNodXRkb3duKGhvc3RJcCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgd2lmaXMsXG4gICAgICBpc0ZldGNoaW5nLFxuICAgICAgc2VsZWN0ZWRXaWZpLFxuICAgICAgc2VsZWN0V2lmaSxcbiAgICAgIGNoYW5nZVB3ZCxcbiAgICAgIHNlbGVjdGVkS2l0LFxuICAgICAgcmVzZXRXaWZpLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIC8vIGNvbnNvbGUubG9nKCdLaXQ6JywgdGhpcy5wcm9wcyk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLTkgbXktMiBjZW50ZXJlZFwiPlxuICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgaXNGZXRjaGluZz17aXNGZXRjaGluZ31cbiAgICAgICAgICBoYW5kbGVGZXRjaFdpZmlzPXt0aGlzLmhhbmRsZUZldGNoV2lmaXN9XG4gICAgICAgICAgaGFuZGxlQ3JlYXRlQVA9e3RoaXMuaGFuZGxlQ3JlYXRlQVB9XG4gICAgICAgICAgaGFuZGxlU2h1dGRvd249e3RoaXMuaGFuZGxlU2h1dGRvd259XG4gICAgICAgIC8+XG4gICAgICAgIDxBdmFpbGFibGVXaWZpc1xuICAgICAgICAgIHdpZmlzPXt3aWZpc31cbiAgICAgICAgICBsb2FkaW5nPXtpc0ZldGNoaW5nfVxuICAgICAgICAgIHNlbGVjdFdpZmk9e3NlbGVjdFdpZml9XG4gICAgICAgIC8+XG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZFdpZmkgJiYgPFdpZmlNb2RhbFxuICAgICAgICAgICAgc2VsZWN0ZWRXaWZpPXtzZWxlY3RlZFdpZml9XG4gICAgICAgICAgICBjaGFuZ2VQd2Q9e2NoYW5nZVB3ZH1cbiAgICAgICAgICAgIGhhbmRsZUNvbm5lY3Q9e3RoaXMuaGFuZGxlQ29ubmVjdH1cbiAgICAgICAgICAgIGhhbmRsZUNsb3NlPXtyZXNldFdpZml9XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9uZXR3b3Jrcy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgV2lmaXNMaXN0IGZyb20gJy4vd2lmaXMtbGlzdCc7XG5cbmNvbnN0IEF2YWlsYWJsZVdpZmlzID0gKHsgd2lmaXMsIGxvYWRpbmcsIHNlbGVjdFdpZmkgfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtdGl0bGUgaDRcIj5SZWRlcyBXaUZpIERpc3BvbmlibGVzPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZXJcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICB7XG4gICAgICAgICFsb2FkaW5nID9cbiAgICAgICAgICA8V2lmaXNMaXN0IHdpZmlzPXt3aWZpc30gc2VsZWN0V2lmaT17c2VsZWN0V2lmaX0gLz4gOlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9hZGluZyBsb2FkaW5nLWxnXCIgLz5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBBdmFpbGFibGVXaWZpcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL25ldHdvcmtzL2F2YWlsYWJsZS13aWZpcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgV2lmaSBmcm9tICcuL3dpZmknO1xuXG5jb25zdCBSZW5kZXJXaWZpcyA9ICh7IHdpZmlzLCBzZWxlY3RXaWZpIH0pID0+IChcbiAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtaG92ZXIgbXgtMlwiPlxuICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoPlJlZDwvdGg+XG4gICAgICAgIDx0aD5DYWxpZGFkPC90aD5cbiAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNvbC0zIHRleHQtY2VudGVyXCI+T3BjaW9uZXM8L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgIHtcbiAgICAgICAgd2lmaXMubWFwKHdpZmkgPT4gKFxuICAgICAgICAgIDxXaWZpXG4gICAgICAgICAgICBrZXk9e3dpZmkuYWRkcmVzc31cbiAgICAgICAgICAgIHNzaWQ9e3dpZmkuc3NpZH1cbiAgICAgICAgICAgIHF1YWxpdHk9e3dpZmkucXVhbGl0eX1cbiAgICAgICAgICAgIG9wZW5Nb2RhbD17c2VsZWN0V2lmaSh7IHNzaWQ6IHdpZmkuc3NpZCwgcHdkOiAnJyB9KX1cbiAgICAgICAgICAvPlxuICAgICAgICApKVxuICAgICAgfVxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG4pO1xuXG5jb25zdCBXaWZpc0xpc3QgPSAoeyB3aWZpcywgc2VsZWN0V2lmaSB9KSA9PiAoXG4gIHdpZmlzLmxlbmd0aCA+IDAgP1xuICAgIDxSZW5kZXJXaWZpcyB3aWZpcz17d2lmaXN9IHNlbGVjdFdpZmk9e3NlbGVjdFdpZml9IC8+IDpcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRvYXN0IHRvYXMtd2FybmluZ1wiPlxuICAgICAgTm8gaGF5IHJlZGVzIGRpc3BvbmlibGVzLi4uXG4gICAgPC9kaXY+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBXaWZpc0xpc3Q7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9uZXR3b3Jrcy93aWZpcy1saXN0LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgV2lmaSA9ICh7IHNzaWQsIHF1YWxpdHksIG9wZW5Nb2RhbCB9KSA9PiAoXG4gIDx0cj5cbiAgICA8dGQgY2xhc3NOYW1lPVwiaDZcIj57c3NpZH08L3RkPlxuICAgIDx0ZCBjbGFzc05hbWU9XCJoNlwiPntxdWFsaXR5fTwvdGQ+XG4gICAgPHRkIGNsYXNzTmFtZT1cImNvbC0zIHRleHQtY2VudGVyXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBteC0xIHRvb2x0aXBcIlxuICAgICAgICBkYXRhLXRvb2x0aXA9XCJDb25lY3RhcnNlXCJcbiAgICAgICAgb25DbGljaz17b3Blbk1vZGFsfVxuICAgICAgPlxuICAgICAgICA8aSBjbGFzc05hbWU9XCJpY29uIGljb24tbGlua1wiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L3RkPlxuICA8L3RyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgV2lmaTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL25ldHdvcmtzL3dpZmkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBIZWFkZXIgPSAoeyBzc2lkLCBoYW5kbGVDbG9zZSB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWNsZWFyIGZsb2F0LXJpZ2h0XCIgb25DbGljaz17aGFuZGxlQ2xvc2V9IC8+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC10aXRsZSBoNVwiPlBhc3N3b3JkIHBhcmE6IHtgXCIke3NzaWR9XCJgfTwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IEJvZHkgPSAoeyBwd2QsIGhhbmRsZUNoYW5nZVB3ZCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0taW5wdXRcIlxuICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICBpZD1cIndpZmktcGFzc1wiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmQgZGUgbGEgUmVkXCJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZVB3ZH1cbiAgICAgICAgdmFsdWU9e3B3ZH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuY29uc3QgRm9vdGVyID0gKHsgaGFuZGxlQ29ubmVjdCB9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXtoYW5kbGVDb25uZWN0fT5cbiAgICAgIENvbmVjdGFyc2VcbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4pO1xuXG5jbGFzcyBXaWZpTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlUHdkID0gdGhpcy5oYW5kbGVDaGFuZ2VQd2QuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVB3ZChldikge1xuICAgIGNvbnN0IHsgc2VsZWN0ZWRXaWZpLCBjaGFuZ2VQd2QgfSA9IHRoaXMucHJvcHM7XG4gICAgY2hhbmdlUHdkKHsgLi4uc2VsZWN0ZWRXaWZpLCBwd2Q6IGV2LnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkV2lmaSwgaGFuZGxlQ29ubmVjdCwgaGFuZGxlQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgYWN0aXZlXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtb3ZlcmxheVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGFpbmVyIGNvbC02XCI+XG4gICAgICAgICAgPEhlYWRlciBzc2lkPXtzZWxlY3RlZFdpZmkuc3NpZH0gaGFuZGxlQ2xvc2U9e2hhbmRsZUNsb3NlfSAvPlxuICAgICAgICAgIDxCb2R5IHB3ZD17c2VsZWN0ZWRXaWZpLnB3ZH0gaGFuZGxlQ2hhbmdlUHdkPXt0aGlzLmhhbmRsZUNoYW5nZVB3ZH0gLz5cbiAgICAgICAgICA8Rm9vdGVyIGhhbmRsZUNvbm5lY3Q9e2hhbmRsZUNvbm5lY3R9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgV2lmaU1vZGFsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvbmV0d29ya3Mvd2lmaS1tb2RhbC5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYXhpb3NcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IG5ldHdvcmtzIGZyb20gJy4vbmV0d29ya3MtcmVkdWNlcic7XG5cbmNvbnN0IGFsbFJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgbmV0d29ya3MsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgYWxsUmVkdWNlcnM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVkdWNlcnMvaW5kZXguanMiLCJpbXBvcnQge1xuICBXSUZJX0NPTkZJR19SRVFVRVNUX0FWQUlMQUJMRSxcbiAgV0lGSV9DT05GSUdfUkVDRUlWRV9BVkFJTEFCTEUsXG4gIFdJRklfQ09ORklHX1NFTEVDVEVEX1dJRkksXG4gIFdJRklfQ09ORklHX1JFU0VUX1dJRkksXG59IGZyb20gJy4uL2FjdGlvbnMvbmV0d29ya3MtYWN0aW9ucyc7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgc2VsZWN0ZWRXaWZpOiB1bmRlZmluZWQsXG4gIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICB3aWZpczogW10sXG59O1xuXG5jb25zdCBuZXR3b3JrUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFdJRklfQ09ORklHX1JFUVVFU1RfQVZBSUxBQkxFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNGZXRjaGluZzogdHJ1ZSxcbiAgICAgICAgd2lmaXM6IFtdLFxuICAgICAgICBzZWxlY3RlZFdpZmk6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgY2FzZSBXSUZJX0NPTkZJR19SRUNFSVZFX0FWQUlMQUJMRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgICB3aWZpczogYWN0aW9uLndpZmlzLFxuICAgICAgICBzZWxlY3RlZFdpZmk6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgY2FzZSBXSUZJX0NPTkZJR19TRUxFQ1RFRF9XSUZJOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNlbGVjdGVkV2lmaTogYWN0aW9uLndpZmksXG4gICAgICB9O1xuICAgIGNhc2UgV0lGSV9DT05GSUdfUkVTRVRfV0lGSTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBzZWxlY3RlZFdpZmk6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbmV0d29ya1JlZHVjZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVkdWNlcnMvbmV0d29ya3MtcmVkdWNlci5qcyIsImZ1bmN0aW9uIHJlbmRlckZ1bGxQYWdlKG1hcmt1cCwgcHJlbG9hZGVkU3RhdGUpIHtcbiAgcmV0dXJuIGBcblxuICA8IURPQ1RZUEUgaHRtbD5cbiAgPGh0bWwgbGFuZz1cImVuXCI+XG4gICAgPGhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgc2hyaW5rLXRvLWZpdD1ub1wiPlxuICAgICAgPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIiMwMDAwMDBcIj5cbiAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIiVQVUJMSUNfVVJMJS9tYW5pZmVzdC5qc29uXCI+XG4gICAgICA8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgaHJlZj1cIiVQVUJMSUNfVVJMJS9mYXZpY29uLmljb1wiPlxuICAgICAgPHRpdGxlPlJlYWN0IEFwcDwvdGl0bGU+XG4gICAgPC9oZWFkPlxuICAgIDxib2R5PlxuICAgICAgPG5vc2NyaXB0PlxuICAgICAgICBZb3UgbmVlZCB0byBlbmFibGUgSmF2YVNjcmlwdCB0byBydW4gdGhpcyBhcHAuXG4gICAgICA8L25vc2NyaXB0PlxuICAgICAgPGRpdiBpZD1cInJvb3RcIiR7bWFya3VwfT48L2Rpdj5cbiAgICAgIDxzY3JpcHQ+XG4gICAgICAgIC8vIFdBUk5JTkc6IFNlZSB0aGUgZm9sbG93aW5nIGZvciBzZWN1cml0eSBpc3N1ZXMgYXJvdW5kIGVtYmVkZGluZyBKU09OIGluIEhUTUw6XG4gICAgICAgIC8vIGh0dHA6Ly9yZWR1eC5qcy5vcmcvZG9jcy9yZWNpcGVzL1NlcnZlclJlbmRlcmluZy5odG1sI3NlY3VyaXR5LWNvbnNpZGVyYXRpb25zXG4gICAgICAgIHdpbmRvdy5fX1BSRUxPQURFRF9TVEFURV9fID0gJHtKU09OLnN0cmluZ2lmeShwcmVsb2FkZWRTdGF0ZSkucmVwbGFjZSgvPC9nLCAnXFxcXHUwMDNjJyl9XG4gICAgICA8L3NjcmlwdD5cbiAgICA8L2JvZHk+XG4gIDwvaHRtbD5cbiAgICBgO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlckZ1bGxQYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NlcnZlci90ZW1wbGF0ZS5qcyIsImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IHsgY29ubmVjdFdpZmksIHN0YXJ0QVAgfSA9IHJlcXVpcmUoJ3dpZmktY29uZmlnJyk7XG5jb25zdCBpd2xpc3QgPSByZXF1aXJlKCd3aXJlbGVzcy10b29scy9pd2xpc3QnKTtcbmNvbnN0IGNvbW1hbmQgPSByZXF1aXJlKCcuLi9yb2JvdG9pcy1yZXNldC9jb21tYW5kcycpO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb3V0ZXIudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJywgJ09yaWdpbiwgWC1SZXF1ZXN0ZWQtV2l0aCwgQ29udGVudC1UeXBlLCBBY2NlcHQnKTtcbiAgbmV4dCgpO1xufSk7XG5cbnJvdXRlci51c2UoYm9keVBhcnNlci5qc29uKCkpO1xucm91dGVyLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5cbnJvdXRlci5nZXQoJy9hbGwnLCAocmVxLCByZXMpID0+IHtcbiAgaXdsaXN0LnNjYW4oJ3dsYW4wJywgKGVyciwgbmV0d29ya3MpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICByZXMuc3RhdHVzKDQwNCkuanNvbih7XG4gICAgICAgIG1lc3NhZ2U6ICdFcnJvciByZWFkaW5nIHdpZmlzJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnaXdsaXN0IGFsbDonLCBuZXR3b3Jrcyk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgbmV0d29ya3MsXG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbnJvdXRlci5wb3N0KCcvY29ubmVjdCcsIChyZXEsIHJlcykgPT4ge1xuICAvLyBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICBjb25zdCB7IHNzaWQsIHB3ZCB9ID0gcmVxLmJvZHk7XG4gIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcbiAgY29ubmVjdFdpZmkoc3NpZCwgcHdkKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIG9rOiB0cnVlLFxuICB9KTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29tbWFuZCgnc3VkbyBzaHV0ZG93biAtciBub3cnKTtcbiAgfSwgNTAwKTtcbn0pO1xuXG5yb3V0ZXIuZ2V0KCcvaG9zdG5hbWUnLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgaG9zdG5hbWUgPSBvcy5ob3N0bmFtZSgpO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgaG9zdG5hbWUsXG4gIH0pO1xufSk7XG5cbnJvdXRlci5nZXQoJy9zdGFydC1hcCcsIChyZXEsIHJlcykgPT4ge1xuICBzdGFydEFQKCk7XG4gIC8vIGNvbnN0IGhvc3RuYW1lID0gb3MuaG9zdG5hbWUoKTtcbiAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgIG9rOiAnb2snLFxuICB9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIvcm91dGVzL3dpZmktcm91dGVzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm9zXCJcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndpcmVsZXNzLXRvb2xzL2l3bGlzdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIndpcmVsZXNzLXRvb2xzL2l3bGlzdFwiXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCB7IEdwaW8gfSA9IHJlcXVpcmUoJ29ub2ZmJyk7XG5jb25zdCB3aWZpQ29uZmlnID0gcmVxdWlyZSgnd2lmaS1jb25maWcnKTtcbmNvbnN0IGNvbW1hbmQgPSByZXF1aXJlKCcuL2NvbW1hbmRzJyk7XG5cbmNvbnN0IGJ1dHRvbiA9IG5ldyBHcGlvKDQsICdpbicsICdib3RoJyk7XG5cbmxldCBocnN0YXJ0O1xubGV0IGhyZW5kO1xuXG5jb25zdCByZXNldEZ1bmN0aW9uID0gKHNlY29uZHMpID0+IHtcbiAgc3dpdGNoICh0cnVlKSB7XG4gICAgY2FzZSBzZWNvbmRzID49IDM6XG4gICAgICBjb25zb2xlLmxvZygnLS0tPiBSb2JvdG9pcyBzeXN0ZW0gZ29pbmcgdG8gc2h1dGRvd24uLi4nKTtcbiAgICAgIGNvbW1hbmQoJ3N1ZG8gc2h1dGRvd24gLWggbm93Jyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5sb2coJy0tLT4gUm9ib3RvaXMgZW5hYmxlIEFjY2VzcyBQb2ludC4uLicpO1xuICAgICAgd2lmaUNvbmZpZy5zdGFydEFQKCk7XG4gIH1cbn07XG5cbmV4cG9ydHMuaW5pdCA9ICgpID0+IHtcbiAgYnV0dG9uLndhdGNoKChlcnIsIHZhbHVlKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gMSkge1xuICAgICAgaHJzdGFydCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhyZW5kID0gcHJvY2Vzcy5ocnRpbWUoaHJzdGFydCk7XG4gICAgICByZXNldEZ1bmN0aW9uKGhyZW5kWzBdKTtcbiAgICAgIGhyc3RhcnQgPSB1bmRlZmluZWQ7XG4gICAgICBocmVuZCA9IHVuZGVmaW5lZDtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbygnRXhlY3V0aW9uIHRpbWUgKGhyKTogJWRzICVkbXMnLCBocmVuZFswXSwgaHJlbmRbMV0gLyAxMDAwMDAwKTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZXJ2ZXIvcm9ib3RvaXMtcmVzZXQvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvbm9mZlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm9ub2ZmXCJcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=