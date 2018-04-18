import React, { Component } from 'react';


import './Builder.css'


class Builder extends Component {


  render() {
    const renderArmy1=this.props.player1Army.map((unit)=>{
      return <ul>{unit.props.unit.name}</ul>
    })
    const renderArmy2=this.props.player2Army.map((unit)=>{
      return <ul>{unit.props.unit.name}</ul>
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

export default Builder;
