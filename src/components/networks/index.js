import React from 'react';
import AvailableWifis from './available-wifis';
import WifiModal from './wifi-modal';
import { createAP, shutdown } from '../../actions/networks-actions';

const Header = ({ isFetching, handleCreateAP, handleShutdown, handleFetchWifis }) => (
  <div className="tile">
    <div className="tile-content">
      <p className="tile-title h5">Configuración de la impresora</p>
    </div>
    <div className="tile-action">
      <button className={`btn btn-primary m-1 ${isFetching ? 'loading' : ''}`} onClick={handleFetchWifis}>Buscar Redes WiFi</button>
      <button className="btn btn-primary m-1" onClick={handleCreateAP}>Crear Access Point</button>
      <button className="btn btn-link label label-warning m-1" onClick={handleShutdown}>Apagar</button>
    </div>
  </div>
);

class App extends React.Component {
  constructor() {
    super();
    this.handleConnect = this.handleConnect.bind(this);
    this.handleFetchWifis = this.handleFetchWifis.bind(this);
    this.handleCreateAP = this.handleCreateAP.bind(this);
    this.handleShutdown = this.handleShutdown.bind(this);
  }

  componentWillMount() {
    this.handleFetchWifis();
  }

  handleFetchWifis() {
    const { fetchWifis, hostIp } = this.props;
    fetchWifis(hostIp);
  }

  handleConnect() {
    const { selectedWifi, connectWifi, hostIp } = this.props;
    connectWifi(hostIp, selectedWifi);
  }

  handleCreateAP() {
    const { hostIp } = this.props;
    createAP(hostIp);
  }

  handleShutdown() {
    const { hostIp } = this.props;
    shutdown(hostIp);
  }

  render() {
    const {
      wifis,
      isFetching,
      selectedWifi,
      selectWifi,
      changePwd,
      selectedKit,
      resetWifi,
    } = this.props;
    // console.log('Kit:', this.props);
    return (
      <div className="col-9 my-2 centered">
        <Header
          isFetching={isFetching}
          handleFetchWifis={this.handleFetchWifis}
          handleCreateAP={this.handleCreateAP}
          handleShutdown={this.handleShutdown}
        />
        <AvailableWifis
          wifis={wifis}
          loading={isFetching}
          selectWifi={selectWifi}
        />
        {
          selectedWifi && <WifiModal
            selectedWifi={selectedWifi}
            changePwd={changePwd}
            handleConnect={this.handleConnect}
            handleClose={resetWifi}
          />
        }
      </div>
    );
  }
}

export default App;
