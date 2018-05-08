import React, { Component } from 'react';
import './InfoBar.css'
import UnitInfo from './UnitInfo'
import CombatLog from './CombatLog'
import GameOver from './GameOver'

import {connect} from 'react-redux'

class InfoBar extends Component {
  render(){
    return (
      <div className="infobar">
      {this.props.store.player1List.length===0 || this.props.store.player2List.length===0 ? <GameOver/> : this.props.store.infoToggle ? <UnitInfo/> : <CombatLog/>}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(InfoBar);
