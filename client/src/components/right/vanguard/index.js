import React, { memo } from 'react'
import './style.css'

import DataShow from "../welcome/dad_show"

export default memo(function Vanguard() {
  return (
    <div >
      <h1 className='v_h1'>Top Movers of Vanguard ETF</h1>
      <DataShow/>
    </div>
  )
})
