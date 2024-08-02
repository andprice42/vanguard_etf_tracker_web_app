import React from 'react'
import { connect } from 'react-redux'

import Wdata from './data'

function Welcome(props) {
    return (
        <div>
            <Wdata/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Welcome)