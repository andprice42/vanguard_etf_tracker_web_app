import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import {
  addNumber,
  getWatchlist,
  getVanguardlist
} from '../../store/actionCreators'

import './style.css'

class Left extends PureComponent {

  componentDidMount() {
    this.props.getwl()
    this.props.getetf()
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <div onClick={e => this.props.goNumber(1)}>My Watchlist</div>
          </li>
          <li>
            <div onClick={e => this.props.goNumber(4)}>Top Movers</div>
          </li>
          <li>
            <div onClick={e => this.props.goNumber(6)}>Recommendations</div>
          </li>
        </ul>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    number: state.number
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goNumber(num){
      dispatch(addNumber(num))
    },
    getwl(){
      dispatch(getWatchlist)
    },
    getetf(){
      dispatch(getVanguardlist)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Left)
