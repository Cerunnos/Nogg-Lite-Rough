import React, { Component } from 'react';
import {connect} from 'react-redux'
import {clearBuildList} from '../Redux/actions'

import './Builder.css'


class Builder extends Component {
  state={
    name:'',
    description:'',

  }

  handleSubmit=(e)=>{
    e.preventDefault()
    let unitIdArray=[]
    this.props.store.buildList.forEach(unit=>{
      unitIdArray.push(unit.id)
    })
    console.log(unitIdArray)
    let joinedArray=unitIdArray.join()
    let splitString=joinedArray.split(",")

    let newArmylist={
      name:this.state.name,
      description:this.state.description,
      unit_ids:joinedArray
    }

    let options={
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newArmylist)
    }
    fetch('http://localhost:3000/armylists',options)
    .then(res=>res.json())
    .then(json=>console.log(json))
    this.props.dispatch(clearBuildList())
  }

  handleChange=(e)=>{
    console.log(e.target.name)
    this.setState({
      [e.target.name]:e.target.value
    },()=>console.log(this.state))
  }

  render() {
    console.log(this.props.store.buildList)
    const renderArmyComp=this.props.store.buildList.map((unit)=>{
      return <ul key={Math.random()}>{unit.name}</ul>
    })
    return(
      <div className="listContainer">
        <form onSubmit={this.handleSubmit}>
          Name:<br/>
          <input type="text" name="name" onChange={this.handleChange}/><br/>
          Description:<br/>
          <textarea onChange={this.handleChange}/><br/>
          <input type="submit" name="description"/>
        </form>
        <h4>Army Composition:</h4>
        {renderArmyComp}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    store: state
  };
};

export default connect(mapStateToProps)(Builder);
