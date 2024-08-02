import React, { memo } from 'react'

import './style.css'

import Title from '../../components/title'
import Left from '../../components/left'
import Watchlist from '../../components/right'

export default memo(function Welcome() {
  return (
    <div>
      <Title></Title>
      <ul className='box'>
        <li className='box_left'>
          <Left />
        </li>
        <li className='box_right'>
          <Watchlist/>
        </li>
      </ul>
      <p className='bottom'>Designed with Glacial Brilliance by Icey</p>
    </div>
  )
})
