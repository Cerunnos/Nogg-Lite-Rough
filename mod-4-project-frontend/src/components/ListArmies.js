import React, { Component } from 'react';
import Army from './Army'
import Builder from './Builder'

import './ListArmies.css'

class ListArmies extends Component {
    render() {
      // const counter=0
      const renderArmies=this.props.armies.map((army)=>{
        return <Army army={army} key={army.id} units={this.props.units} removeUnit={this.props.removeUnit} reset={this.props.reset} setArmyLists={this.props.setArmyLists}/>
      })
    return(
      <div className="armiesContainer">
        <div className="list row">
          {renderArmies}
        </div>
        <Builder/>
      </div>
    )
  }
}

export default ListArmies
