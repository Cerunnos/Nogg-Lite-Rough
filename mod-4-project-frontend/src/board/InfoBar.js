import React, { Component } from 'react';
import './InfoBar.css'

import {connect} from 'react-redux'

class InfoBar extends Component {

  handleButtonClick=()=>{
    this.props.handleEndActivation()
  }

  handleKeyDown=(e)=>{
    if (e.keyCode==32){
     console.log(e.target)
    }
  }

  handleEndRound=()=>{

  }

  render() {
    // let info=this.props.units
    // let currentUnit=''
    // let statline=''
    // let hp=''
    // let mp=''
    // let ap=''
    // let activated=''
    // if(this.props.currentlySelected){
      // currentUnit=this.props.currentlySelected.state.unit
      // hp=this.props.currentlySelected.state.hp
      // mp=this.props.currentlySelected.state.movementPhase
      // ap=this.props.currentlySelected.state.attackPhase
      // activated=this.props.currentlySelected.state.activated
      // statline=<p>M: {currentUnit.movement} BS: {currentUnit.bs} AS: {currentUnit.as} WP: {currentUnit.willpower} AR:{currentUnit.armor}  W: {currentUnit.wounds} LS: {currentUnit.leadership}</p>
    // }
    return (
      <div className="infobar" onKeyDown={this.handleKeyDown}>
      <h1>Player Turn:{this.props.playerTurn}</h1>
      <h2>Remaining Activations:{this.props.store.activations}</h2>
      <h2>Round:{this.props.store.round}</h2>
      <button onClick={this.handleButtonClick}>End Activation</button><br/>
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
