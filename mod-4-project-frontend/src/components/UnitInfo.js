import React, { Component } from 'react';
import './UnitInfo.css'

class UnitInfo extends Component {
    render() {
    return(
      <div className="info">
        <p> Name: {this.props.currentUnit.name} M: {this.props.currentUnit.movement} BS: {this.props.currentUnit.bs} AS: {this.props.currentUnit.as} WP: {this.props.currentUnit.willpower} AR:{this.props.currentUnit.armor}  W: {this.props.currentUnit.wounds} LS: {this.props.currentUnit.leadership} Pts: {this.props.currentUnit.points}</p>
        Ablities:{this.props.currentUnit.abilities}<br/>
        <br/>
        Info:{this.props.currentUnit.description}<br/>
      </div>
    )
  }
}

export default UnitInfo
