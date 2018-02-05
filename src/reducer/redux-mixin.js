import * as Redux from 'redux';
import PolymerRedux from 'polymer-redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

export {
  fetchBoardList,
  fetchGroupList,
  fetchBoard,
  fetchSettings,
  updateBoard,
  createBoard,
  createGroup,
  followRouteChange,
  setRoute
} from './actions';

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(thunk)
);

export const ReduxMixin = PolymerRedux(store);
