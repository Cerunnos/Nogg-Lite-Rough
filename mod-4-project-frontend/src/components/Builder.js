import React, { Component } from 'react';
import {connect} from 'react-redux'


import './Builder.css'


class Builder extends Component {


  render() {
    const renderArmy1=this.props.store.player1Army.map((unit)=>{
      return <ul key={Math.random()}>{unit.name}</ul>
    })
    const renderArmy2=this.props.store.player2Army.map((unit)=>{
      return <ul key={Math.random()}>{unit.name}</ul>
    })

    return(
      <div>
        <h4>Player1 Army</h4>
        {renderArmy1}
        <h4>Player2 Army</h4>
        {renderArmy2}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    store: state
  };
};

export default connect(mapStateToProps)(Builder);
