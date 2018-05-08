import React, { Component } from 'react';
import './UnitInfo.css'

class UnitInfo extends Component {
    render() {
    return(
      <div className="info">
        <p> Name: {this.props.currentUnit.name} M:{this.props.currentUnit.movement} R:{this.props.currentUnit.range} BS:{this.props.currentUnit.bs} AS:{this.props.currentUnit.as} A:{this.props.currentUnit.attacks} AR:{this.props.currentUnit.armor}  W:{this.props.currentUnit.wounds}  PTS:{this.props.currentUnit.points}</p>
        Ablities:{this.props.currentUnit.abilities}<br/>
        <br/>
        Info:{this.props.currentUnit.description}<br/>
      </div>
    )
  }
}

export default UnitInfo
