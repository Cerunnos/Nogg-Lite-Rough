import React, { Component } from 'react';
import './CombatLog.css'

import {connect} from 'react-redux'

class CombatLog extends Component {

  render(){
    let counter=0
    let renderLog=this.props.store.log.map(string=>{
      counter++
      return <p key={counter}>{string}</p>
    })
    return (
      <div className="combatLog">
        <div className="logContainer">
          {renderLog}
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

export default connect(mapStateToProps)(CombatLog);
