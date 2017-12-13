import {
  WIFI_CONFIG_REQUEST_AVAILABLE,
  WIFI_CONFIG_RECEIVE_AVAILABLE,
  WIFI_CONFIG_SELECTED_WIFI,
  WIFI_CONFIG_RESET_WIFI,
} from '../actions/networks-actions';

const initialState = {
  selectedWifi: undefined,
  isFetching: false,
  wifis: [],
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case WIFI_CONFIG_REQUEST_AVAILABLE:
      return {
        isFetching: true,
        wifis: [],
        selectedWifi: undefined,
      };
    case WIFI_CONFIG_RECEIVE_AVAILABLE:
      return {
        isFetching: false,
        wifis: action.wifis,
        selectedWifi: undefined,
      };
    case WIFI_CONFIG_SELECTED_WIFI:
      return {
        ...state,
        selectedWifi: action.wifi,
      };
    case WIFI_CONFIG_RESET_WIFI:
      return {
        ...state,
        selectedWifi: undefined,
      };
    default:
      return state;
  }
};

export default networkReducer;
