import React, { Component } from 'react';
import ListUnits from './ListUnits'
import './Army.css'

// let cuid = require('cuid')


class Army extends Component {
  state={
    clicked:false
  }

    handleClick=()=>{
      this.setState({
        clicked:!this.state.clicked
      })
    }

    render() {
    return(
      <div className="column">
        <h4 onClick={this.handleClick}>{this.props.army.name}</h4>
        {this.state.clicked ? <ListUnits army={this.props.army} units={this.props.units} removeUnit={this.props.removeUnit} reset={this.props.reset} setArmyLists={this.props.setArmyLists}/> : <div></div>}
      </div>
    )
  }
}

export default Army;
