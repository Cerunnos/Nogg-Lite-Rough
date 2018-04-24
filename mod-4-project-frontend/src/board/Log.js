import React, { Component } from 'react';
import './Log.css'

import {connect} from 'react-redux'

class Log extends Component {
  render() {
    return (
      <div className="Log">
        Hi There
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(Log);
