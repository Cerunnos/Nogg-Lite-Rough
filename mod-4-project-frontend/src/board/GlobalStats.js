import React, { Component } from 'react';
import './GlobalStats.css'

import {connect} from 'react-redux'

class GlobalStats extends Component {

  handleButtonClick=()=>{
    this.props.handleEndActivation()
  }

  render(){

    return (
      <div className="GlobalStats" onKeyDown={this.handleKeyDown}>
        <h1>Player Turn:{this.props.store.playerTurn}</h1>
        <h2>Remaining Activations:{this.props.store.activations}</h2>
        <h2>Round:{this.props.store.round}</h2>
        <button onClick={this.handleButtonClick}>End Activation</button><br/>
        {this.props.store.player1List.length===0 || this.props.store.player2List.length===0 ? <h1>Game Over</h1> : null}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(GlobalStats);
