import React, { Component } from 'react';
import './UnitInfo.css'
import spells from '../spells'

import {connect} from 'react-redux'

class UnitInfo extends Component {

  handleButtonClick=()=>{
    this.props.handleEndActivation()
  }

  handleSpells=(e)=>{
    spells(e.target.value)
  }

  render(){
    let info=this.props.units
    let currentUnit=''
    let statline=''
    let hp=''
    let mp=''
    let ap=''
    let activated=''
    let spells=''
    let renderSpells=''
    if(this.props.store.currentlySelected){
      currentUnit=this.props.store.currentlySelected.state.unit
      hp=this.props.store.currentlySelected.state.hp
      mp=this.props.store.currentlySelected.state.movementPhase
      ap=this.props.store.currentlySelected.state.attackPhase
      activated=this.props.store.currentlySelected.state.activated
      statline=<p>M: {currentUnit.movement} BS: {currentUnit.bs} AS: {currentUnit.as} A: {currentUnit.attacks} AR:{currentUnit.armor}  W: {currentUnit.wounds}</p>
      spells=currentUnit.abilities.split(",")
      renderSpells=spells.map(spell=>{
        return <button value={spell} onClick={this.handleSpells}>{spell}</button>
      })
    }

    return (
      <div className="UnitInfo">
        <h2>{this.props.store.currentlySelected ? this.props.store.currentlySelected.state.unit.name : null}</h2>
        <h2>{this.props.store.currentlySelected ? statline : null}</h2>
        <h2>{this.props.store.currentlySelected ? `Wounds Left: ${this.props.store.currentlySelected.state.hp}/${this.props.store.currentlySelected.state.unit.wounds} Attacks Left: ${this.props.store.currentlySelected.state.attackPhase}/${this.props.store.currentlySelected.state.totalAttacks}` : null}</h2>
        <h3>{this.props.store.currentlySelected ? this.props.store.currentlySelected.state.unit.description : null}</h3>
      </div>
    );
  }
}
// {this.props.store.currentlySelected ? renderSpells : null}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(UnitInfo);
