import React, { Component } from 'react';
import Piece from './Piece'
import './Tile.css'

class Tile extends Component {

  state={
    terrain:false,
  }

  renderTerrain=()=>{
    if((this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3)){
      return <div className="item terrain" id={`${this.props.x},${this.props.y}`} onClick={this.handleClick}></div>
    }
  }

  renderTiles=()=>{
    if (!((this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3))){
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
