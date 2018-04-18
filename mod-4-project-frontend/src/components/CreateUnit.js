import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './CreateUnit.css'

class CreateUnit extends Component {
  state={
    name:"",
    description:"",
    abilities:"",
    movement:"",
    range:"",
    bs:"",
    as:"",
    willpower:"",
    armor:"",
    wounds:"",
    leadership:"",
    army_id:""
  }

  createUnit=(event)=>{
    event.preventDefault()

    let newUnit = {
      name:this.state.name,
      description:this.state.description,
      abilities:this.state.abilities,
      movement:parseInt(this.state.movement,10),
      range:parseInt(this.state.range,10),
      bs:parseInt(this.state.bs,10),
      as:parseInt(this.state.as,10),
      willpower:parseInt(this.state.willpower,10),
      armor:parseInt(this.state.armor,10),
      wounds:parseInt(this.state.wounds,10),
      leadership:parseInt(this.state.leadership,10),
      army_id:parseInt(this.state.army_id,10)
    }

    this.props.addNewUnit(newUnit)

    let options={
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newUnit)
    }
    fetch('http://localhost:3000/units',options)
    .then(res=>res.json())
    .then(json=>console.log("Hi There"))
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({
      name:"",
      description:"",
      abilities:"",
      movement:"",
      range:"",
      bs:"",
      as:"",
      willpower:"",
      wounds:"",
      leadership:"",
      army_id:""
    })
    this.props.history.push('/')
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    },()=>console.log(this.state))
  }

  render() {
  return(

  <form id="form" className="form" onSubmit={this.createUnit}>
    Name:<br/>
    <input value={this.state.name} type="text" name="name"  autoComplete="off" onChange={this.handleChange}/><br/>

    Description:<br/>
    <textarea id="description" value={this.state.description} type="text" name="description"  autoComplete="off" onChange={this.handleChange} className="large"/><br/>

    Ablities:<br/>
    <textarea value={this.state.abilities} type="text" name="abilities"  autoComplete="off" onChange={this.handleChange} className="large"/><br/>

    Movement:<br/>
    <input value={this.state.movement} type="text" name="movement"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Range:<br/>
    <input value={this.state.range} type="text" name="range"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Attack Skill:<br/>
    <input value={this.state.as} type="text" name="as"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Ballistic Skill:<br/>
    <input value={this.state.bs} type="text" name="bs"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Willpower:<br/>
    <input value={this.state.willpower} type="text" name="willpower"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Armor:<br/>
    <input value={this.state.armor} type="text" name="armor"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Wounds:<br/>
    <input value={this.state.wounds} type="text" name="wounds"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Leadership:<br/>
    <input value={this.state.leadership} type="text" name="leadership"  autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    Army Id:<br/>
    <input value={this.state.army_id} type="text" name="army_id" autoComplete="off" onChange={this.handleChange} className="small"/><br/>

    <input type="submit" name="submit"/>
  </form>
  )
  }
}

export default withRouter(CreateUnit);
