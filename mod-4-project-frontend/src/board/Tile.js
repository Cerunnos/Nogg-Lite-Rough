import React, { Component } from 'react';
import Piece from './Piece'
import './Tile.css'

import maps from '../maps'

class Tile extends Component {

  state={
    terrain:false,
  }
  // (this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3)
  renderTerrain=()=>{
    if(maps("eight",this.props.x,this.props.y)){
      return <div className="item terrain" id={`${this.props.x},${this.props.y}`} onClick={this.handleClick}></div>
    }
  }

  renderTiles=()=>{
    if (!(maps("eight",this.props.x,this.props.y))) {
      return <div className="item" id={`${this.props.x},${this.props.y}`} onClick={this.handleClick}><Piece handleLogic={this.props.handleLogic} coordinates={`${this.props.x},${this.props.y}`}/></div>
    }
  }


  render() {
    return (
      <td>
      {this.renderTerrain()}
      {this.renderTiles()}
      </td>
    );
  }
}

export default Tile;
