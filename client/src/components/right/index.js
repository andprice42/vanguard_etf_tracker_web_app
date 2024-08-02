import React from 'react'
import { connect } from 'react-redux'

import './style.css'

import Welcome from './welcome'  // My watchlist
import WatchList from './watchlist' //ETF details
import Details from './details'    //stock details
import Vanguard from './vanguard'  //Top movers
// import Vanguardlist from './vanguardlist'     
import UserRecommendations from './UserRecommendations' //customized recommendation

function Right(props) {
  let number = props.number

  function show() {
    switch (number) {
      case 1:
        return <Welcome />
      case 2:
        return <WatchList />
      case 3:
        return <Details />
      case 4:
        return <Vanguard />
        // case 5:
        //   return <Vanguardlist/>
          case 6:
            return <UserRecommendations/>
      default:
        return <Welcome />
    }
  }

  return (
    <div>
      {show()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    number: state.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Right)