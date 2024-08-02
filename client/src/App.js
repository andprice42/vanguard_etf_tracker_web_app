import React, { memo } from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import PrivateRouter from './router'

export default memo(function App() {
  return (
    <Router>
      <PrivateRouter/>
    </Router>
  )
})

