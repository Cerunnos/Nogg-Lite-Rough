import React, { Component } from 'react';
import Piece from './Piece'
import './Tile.css'
import {connect} from 'react-redux'

import maps from '../maps'

class Tile extends Component {

  state={
    terrain:false,
  }
  // (this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3)
  renderTerrain=()=>{
    if(maps(this.props.store.map,this.props.x,this.props.y)){
      return <div className="item terrain" id={`${this.props.x},${this.props.y}`}><Piece terrain={true} handleLogic={this.props.handleLogic} coordinates={`${this.props.x},${this.props.y}`}/></div>
    }
  }

  renderTiles=()=>{
    if (!(maps(this.props.store.map,this.props.x,this.props.y))) {
      return <div className="item" id={`${this.props.x},${this.props.y}`}><Piece terrain={false} handleLogic={this.props.handleLogic} coordinates={`${this.props.x},${this.props.y}`}/></div>
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

const mapStateToProps=state=>{
  return {
    store: state
  };
};
export default connect(mapStateToProps)(Tile);
