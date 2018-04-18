import React, { Component } from 'react';
import './InfoBar.css'

import {connect} from 'react-redux'
import {addLog} from '../Redux/actions'
import rootReducer from '../Redux/rootReducer'
import store from '../index'

class InfoBar extends Component {

  handleButtonClick=()=>{
    this.props.handleEndActivation()
  }

  render() {
    let info=this.props.units
    let currentUnit=''
    let statline=''
    let hp=''
    let mp=''
    let ap=''
    let activated=''
    if(this.props.currentlySelected){
      currentUnit=this.props.currentlySelected.state.unit
      hp=this.props.currentlySelected.state.hp
      mp=this.props.currentlySelected.state.movementPhase
      ap=this.props.currentlySelected.state.attackPhase
      activated=this.props.currentlySelected.state.activated
      statline=<p>M: {currentUnit.movement} BS: {currentUnit.bs} AS: {currentUnit.as} WP: {currentUnit.willpower} AR:{currentUnit.armor}  W: {currentUnit.wounds} LS: {currentUnit.leadership}</p>
    }
    return (
      <div className="infobar">
        <h1>Player Turn:{this.props.playerTurn}</h1>
        <h1>{this.props.units[0] ? currentUnit.name : null}</h1>
        <h3>{this.props.units[0] ? statline : null}</h3>
        <h3>{this.props.units[0] ? `Wounds:${hp}` : null}</h3>
        <h3>{this.props.units[0] ? `MovementPhase:${mp}` : null}</h3>
        <h3>{this.props.units[0] ? `AttackPhase:${ap}` : null}</h3>
        <h3>{this.props.units[0] ? `Activated:${activated}` : null}</h3>
        <h3>{this.props.units[0] ? currentUnit.abilities : null}</h3>
        <button onClick={this.handleButtonClick}>End Activation</button>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    units:state
  };
};

export default connect(mapStateToProps)(InfoBar);
