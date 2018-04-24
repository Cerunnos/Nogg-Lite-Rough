import React, { Component } from 'react';
import Log from './Log'
import './BottomBar.css'

import {connect} from 'react-redux'

class BottomBar extends Component {
  render() {
    return (
      <div className="bottombar">
        <div>
          <Log/>
        </div>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(BottomBar);
