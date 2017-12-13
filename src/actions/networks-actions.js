import axios from 'axios';

export const WIFI_CONFIG_REQUEST_AVAILABLE = 'WIFI_CONFIG_REQUEST_AVAILABLE';
export const WIFI_CONFIG_RECEIVE_AVAILABLE = 'WIFI_CONFIG_RECEIVE_AVAILABLE';
export const WIFI_CONFIG_SELECTED_WIFI = 'WIFI_CONFIG_SELECTED_WIFI';
export const WIFI_CONFIG_RESET_WIFI = 'WIFI_CONFIG_RESET_WIFI';
export const devHost = '192.168.1.70';

const requestAvailableWifis = () => ({
  type: WIFI_CONFIG_REQUEST_AVAILABLE,
});

const receiveAvailableWifis = wifis => ({
  type: WIFI_CONFIG_RECEIVE_AVAILABLE,
  wifis,
});

export const fetchAvailableWifis = hostIp => (dispatch) => {
  dispatch(requestAvailableWifis());
  return axios({
    method: 'get',
    url: `http://${hostIp}:8082/wifi/all`,
  })
    .then((res) => {
      const { data: { networks } } = res;
      // console.log('networks:', res);
      dispatch(receiveAvailableWifis(networks));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const selectWifi = wifi => ({
  type: WIFI_CONFIG_SELECTED_WIFI,
  wifi,
});

export const resetWifi = () => ({
  type: WIFI_CONFIG_RESET_WIFI,
});

export const connectWifi = (hostIp, wifi) => dispatch =>
  axios({
    method: 'post',
    // baseURL: 'http://192.168.1.75:8082',
    url: `http://${hostIp}:8082/wifi/connect`,
    data: { ...wifi },
  })
    .then((response) => {
      console.log(response);
      dispatch(resetWifi());
    })
    .catch((error) => {
      console.log(error);
    });

export const createAP = hostIp =>
  axios({
    method: 'get',
    url: `http://${hostIp}:8082/wifi/start-ap`,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

export const shutdown = hostIp =>
  axios({
    method: 'get',
    url: `http://${hostIp}:8082/shutdown`,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
