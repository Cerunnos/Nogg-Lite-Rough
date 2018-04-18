import React, { Component } from 'react';
import Piece from './Piece'
import './Tile.css'

class Tile extends Component {

  state={
    terrain:false,
  }

  renderTerrain=()=>{
    if((this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3)){
      return <td className="item terrain" id={`${this.props.x},${this.props.y}`} onClick={this.handleClick}></td>
    }
  }

  renderTiles=()=>{
    if (!((this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3))){
      return <td className="item" id={`${this.props.x},${this.props.y}`} onClick={this.handleClick}><Piece units={this.props.units} handleLogic={this.props.handleLogic} coordinates={`${this.props.x},${this.props.y}`} pieceState={this.props.pieceState} setCurrentlySelected={this.props.setCurrentlySelected} player1List={this.props.player1List} player2List={this.props.player2List}/></td>
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
