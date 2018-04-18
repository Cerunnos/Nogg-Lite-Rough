import React, { Component } from 'react';
import Army from './Army'
import Builder from './Builder'

import './ListArmies.css'

class ListArmies extends Component {
    render() {
      const renderArmies=this.props.armies.map((army)=>{
        return <Army army={army} key={army.id} units={this.props.units} removeUnit={this.props.removeUnit} reset={this.props.reset} setArmyLists={this.props.setArmyLists}/>
      })
    return(
      <div>
        <div className="list row">
          {renderArmies}
        </div>
        <Builder player1Army={this.props.player1Army} player2Army={this.props.player2Army}/>
      </div>
    )
  }
}

export default ListArmies
