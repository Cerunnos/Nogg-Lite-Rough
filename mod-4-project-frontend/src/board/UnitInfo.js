import React, { Component } from 'react';
import './UnitInfo.css'

import {connect} from 'react-redux'

class UnitInfo extends Component {

  handleButtonClick=()=>{
    this.props.handleEndActivation()
  }

  render(){
    let info=this.props.units
    let currentUnit=''
    let statline=''
    let hp=''
    let mp=''
    let ap=''
    let activated=''
    if(this.props.store.currentlySelected){
      currentUnit=this.props.store.currentlySelected.state.unit
      hp=this.props.store.currentlySelected.state.hp
      mp=this.props.store.currentlySelected.state.movementPhase
      ap=this.props.store.currentlySelected.state.attackPhase
      activated=this.props.store.currentlySelected.state.activated
      statline=<p>M: {currentUnit.movement} BS: {currentUnit.bs} AS: {currentUnit.as} WP: {currentUnit.willpower} AR:{currentUnit.armor}  W: {currentUnit.wounds} LS: {currentUnit.leadership}</p>
    }

    return (
      <div className="UnitInfo">
        <h2>{this.props.store.currentlySelected ? this.props.store.currentlySelected.state.unit.name : null}</h2>
        <h2>{this.props.store.currentlySelected ? statline : null}</h2>
        <h3>{this.props.store.currentlySelected ? this.props.store.currentlySelected.state.unit.description : null}</h3>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(UnitInfo);
