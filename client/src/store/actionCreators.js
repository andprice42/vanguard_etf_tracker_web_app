import {
  ADD_NUMBER,
  ADD_WATCHLIST,
  ADD_VANGUARDLIST,
  ADD_ECDATA,
  GO_PAGE,
  USER_RE
} from './constants.js';

export const addNumber = num => ({
  type: ADD_NUMBER,
  num
});

// placeholder for now
export const goData = godata => ({
  type: GO_PAGE,
  godata
});

export const userRe = userre => ({
  type: USER_RE,
  userre
});

export const addWatchlist = watchlist => ({
  type: ADD_WATCHLIST,
  watchlist
});

export const addVanguardlist = vanguardlist => ({
  type: ADD_VANGUARDLIST,
  vanguardlist
});

export const addEcdata = ecdata => ({
  type: ADD_ECDATA,
  ecdata
});

// redux-thunk
export const getWatchlist = dispatch => {
  
  // axiosInstance.get("/ViewFollow").then((result) => {
  //   dispatch(addWatchlist(result.data))
  // }).catch((err) => {
    
  // });
}

export const getVanguardlist = dispatch => {
  // const vanguardlist = [
  //   {
  //     Symbol: 'VTEC',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 1,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC2',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 2,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC3',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 3,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 1,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC2',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 2,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC3',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 3,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 1,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC2',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 2,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC3',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 3,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 1,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC2',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 2,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  //   {
  //     Symbol: 'VTEC3',
  //     Name: 'California Tax-Exempt Bond ETF',
  //     AssetClass: 'Bond – Inter-term State Muni',
  //     Risk: 3,
  //     Price: '100.69',
  //     Changes: '+5.061%'
  //   },
  // ]
  // dispatch(addVanguardlist(vanguardlist))
}

export const getEcdata = dispatch => {
  dispatch(addEcdata())
}
