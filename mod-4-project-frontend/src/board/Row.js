import React, { Component } from 'react';
import Tile from './Tile'
import './Row.css'

class Row extends Component {

  render() {
    let columns=[]
    for (let i=0;i<54;i++){
      columns.push(<Tile x={i} y={this.props.yCoord} handleLogic={this.props.handleLogic} units={this.props.units} key={i}/>)
    }
    return (
      <tr className="row">
        {columns}
      </tr>
    );
  }
}

export default Row;
