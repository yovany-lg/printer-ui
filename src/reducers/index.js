import { combineReducers } from 'redux';
import networks from './networks-reducer';

const allReducers = combineReducers({
  networks,
});

export default allReducers;
