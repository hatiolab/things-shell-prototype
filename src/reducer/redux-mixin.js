import * as Redux from 'redux';
import PolymerRedux from 'polymer-redux';
import reducer from './reducer';

const store = Redux.createStore(reducer);

export const ReduxMixin = PolymerRedux(store);
