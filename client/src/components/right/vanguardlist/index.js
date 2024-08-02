import React, { memo } from 'react'
import { connect } from 'react-redux'

import Vgdata from './vgdata'
import Vgtext from './vgtext'


function Vanguardlist(props) {
  return (
    <div >
      <h1 className='v_h1'>Top Movers of Vanguard ETF Today</h1>

      <div className="box_Search">
        <svg t="1712040596292" className="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="20429" width="200" height="200">
          <path
            d="M756.565333 697.258667c2.133333 1.493333 4.224 3.157333 6.101334 5.12l241.664 241.621333c16.256 16.256 16.512 43.52-0.128 60.16a42.453333 42.453333 0 0 1-60.202667 0.170667l-241.664-241.664a41.429333 41.429333 0 0 1-5.034667-6.101334A424.917333 424.917333 0 0 1 426.666667 853.333333C191.018667 853.333333 0 662.314667 0 426.666667S191.018667 0 426.666667 0s426.666667 191.018667 426.666666 426.666667c0 102.698667-36.266667 196.949333-96.768 270.592zM426.666667 768a341.333333 341.333333 0 1 0 0-682.666667 341.333333 341.333333 0 0 0 0 682.666667z"
            fill="#3D3D3D" p-id="20430"></path>
        </svg>

        <input type="text" placeholder="Search" />
      </div>
      <Vgdata data={props.godata}/>
      <Vgtext data={props.godata} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    godata: state.godata
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vanguardlist)
