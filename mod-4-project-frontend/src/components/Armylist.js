import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchBuildData,addBuilds,fetchUnitData} from '../Redux/actions'

import './Armylist.css'


class Armylist extends Component {

  // componentDidMount(){
  //   this.props.dispatch(fetchUnitData('http://localhost:3000/units'))
  //   this.props.dispatch(fetchBuildData('http://localhost:3000/armylists'))
  // }

  handleClick=(e)=>{
    e.preventDefault()
    console.log(this.props.build.id)

    let options = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
      fetch(`http://localhost:3000/armylists/${this.props.build.id}`, options)
      .then(res=>res.json())
      .then(json=>console.log(json))
  }

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
      <div className="armylist">
        {this.props.build.name}
        <button onClick={this.handleClick}>Delete Build</button>
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
