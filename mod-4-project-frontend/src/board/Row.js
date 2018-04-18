import React, { Component } from 'react';
import Tile from './Tile'
import './Row.css'

class Row extends Component {

  render() {
    let columns=[]
    for (let i=0;i<31;i++){
      columns.push(<Tile x={i} y={this.props.yCoord} handleLogic={this.props.handleLogic} units={this.props.units} key={i} pieceState={this.props.pieceState} setCurrentlySelected={this.props.setCurrentlySelected} player1List={this.props.player1List} player2List={this.props.player2List}/>)
    }
    return (
      <tr className="row">
        {columns}
      </tr>
    );
  }
}

export default Row;
