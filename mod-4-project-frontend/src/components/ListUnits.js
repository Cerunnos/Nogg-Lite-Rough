import React, { Component } from 'react';
import Unit from './Unit'
import './ListUnits.css'

class ListUnits extends Component {
  render() {
    const filteredUnits=this.props.units.filter((unit)=>{
      return this.props.army.id===unit.army_id
    })
    const renderUnits=filteredUnits.map((unit)=>{
      return <Unit key={unit.id} unit={unit} removeUnit={this.props.removeUnit} units={this.props.units} reset={this.props.reset} setArmyLists={this.props.setArmyLists}/>
    })

    return(
      <div className="units">
      {renderUnits}
      </div>
    )
  }
}

export default ListUnits
