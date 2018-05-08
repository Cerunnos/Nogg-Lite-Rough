import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchBuildData,addBuilds,fetchUnitData} from '../Redux/actions'
import ArmylistInfo from './ArmylistInfo'

import './Armylist.css'


class Armylist extends Component {
  state={
    clicked:false
  }

  handleClick=()=>{
    this.setState({
      clicked:!this.state.clicked
    })
  }

  // handleClick=(e)=>{
  //   e.preventDefault()
  //   console.log(this.props.build.id)
  //
  //   let options = {
  //       method: 'DELETE',
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       }
  //     }
  //     fetch(`http://localhost:3000/armylists/${this.props.build.id}`, options)
  //     .then(res=>res.json())
  //     .then(json=>console.log(json))
  // }

  // deleteUnit=(e)=>{
  //
  //   e.preventDefault()
  //   let id = e.target.id
  //   this.props.removeUnit(id)
  //
  //   let options = {
  //     method: 'DELETE',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     }
  //   }
  //   fetch(`http://localhost:3000/units/${id}`, options)
  //   .then(res=>res.json())
  //   .then(json=>console.log(json))
  // }

  render() {
    return(
      <div className="armylist" onClick={this.handleClick}>
        <h3>{this.props.build.name}</h3>
        {this.state.clicked ? <ArmylistInfo build={this.props.build} allBuilds={this.props.allBuilds} units={this.props.units}/> : null}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    store: state
  };
};
export default connect(mapStateToProps)(Armylist);
