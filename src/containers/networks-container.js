import { connect } from 'react-redux';
import Networks from '../components/networks';
import { fetchAvailableWifis, selectWifi, connectWifi, resetWifi } from '../actions/networks-actions';

const mapStateToProps = ({ kitConfig: { wifiConfig, selectedKit } }) => ({
  ...wifiConfig,
  selectedKit,
});

const mapDispatchToProps = dispatch => ({
  fetchWifis: hostIp => dispatch(fetchAvailableWifis(hostIp)),
  selectWifi: wifi => () => dispatch(selectWifi(wifi)),
  changePwd: wifi => dispatch(selectWifi(wifi)),
  connectWifi: (hostIp, wifi) => dispatch(connectWifi(hostIp, wifi)),
  resetWifi: () => dispatch(resetWifi()),
});

const NetworksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Networks);

export default NetworksContainer;
