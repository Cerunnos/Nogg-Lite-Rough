import React, { Component } from 'react';
import UnitInfo from './UnitInfo'
import EditUnit from './EditUnit'
import {Route, Link} from 'react-router-dom'
import './Unit.css'

class Unit extends Component {
  state = {
    clickedInfo: false,
    clickedEdit: false
  }

  deleteUnit=(e)=>{

    e.preventDefault()
    let id = e.target.id
    this.props.removeUnit(id)

    let options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
    fetch(`http://localhost:3000/units/${id}`, options)
    .then(res=>res.json())
    .then(json=>console.log(json))
  }

  handleUnitClick=()=>{
    this.setState({
      clickedInfo: !this.state.clickedInfo
    })
  }

  handleEditClick=()=>{
    this.setState({
      clickedEdit: !this.state.clickedEdit
    })
  }

  handleAddClick=(e)=>{
    this.props.setArmyLists(this,e)
  }

  showInfo = () => (this.state.clickedInfo ? <UnitInfo currentUnit={this.props.unit}/> : <div></div>)
  showEdit = () => (this.state.clickedEdit ? <EditUnit unit={this.props.unit} reset={this.props.reset}/> : <div></div>)

  render() {
    return(
      <div>
        <p className="unit" id={this.props.unit.id} onClick={this.handleUnitClick}>
          {this.props.unit.name}
        </p>
        <button onClick={this.handleEditClick}>Edit Unit</button>
        <button id={this.props.unit.id} onClick={this.deleteUnit}>Delete Unit</button><br/>
        <button onClick={this.handleAddClick} value="1">Add To Army 1</button><br/>
        <button onClick={this.handleAddClick} value="2">Add To Army 2</button>
        {this.showInfo()}
        {this.showEdit()}
      </div>
    )
  }
}

export default Unit;
