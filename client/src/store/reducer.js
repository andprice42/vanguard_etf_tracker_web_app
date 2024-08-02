import {
  ADD_NUMBER,
  ADD_WATCHLIST,
  ADD_VANGUARDLIST,
  ADD_ECDATA,
  GO_PAGE,
  USER_RE
} from './constants.js';

const defaultState = {
  number: 1,
  watchlist: [],
  vanguardlist: [],
  ecdata: [],
  godata: [],
  userre: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state, number: state.number = action.num };
    case ADD_WATCHLIST:
      return { ...state, watchlist: action.watchlist };
    case ADD_VANGUARDLIST:
      return { ...state, vanguardlist: action.vanguardlist };
    case ADD_ECDATA:
      return { ...state, ecdata: action.ecdata };
    case GO_PAGE:
      return { ...state, godata: state.godata = action.godata };
    case USER_RE:
      return { ...state, userre: state.userre = action.userre };
    default:
      return state;
  }
}

export default reducer;
