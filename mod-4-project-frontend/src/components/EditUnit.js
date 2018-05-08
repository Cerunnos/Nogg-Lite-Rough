import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './EditUnit.css'

class EditUnit extends Component {
  state={
    name:"",
    description:"",
    abilities:"",
    movement:"",
    range:"",
    bs:"",
    as:"",
    armor:"",
    wounds:"",
    points:"",
    attacks:"",
    army_id:""
  }

  editUnit=(event)=>{
    event.preventDefault()

    let editedUnit = {
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
      points:parseInt(this.state.points,10),
      attacks:parseInt(this.state.attacks,10),
      army_id:parseInt(this.state.army_id,10)
    }

    let options={
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(editedUnit)
    }
    fetch(`http://localhost:3000/units/${this.props.unit.id}`,options)
    .then(res=>res.json())
    .then(json=>console.log(json))
    this.props.reset(editedUnit,this.props.unit.id)
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
      armor:"",
      wounds:"",
      leadership:"",
      points:"",
      attacks:"",
      army_id:""
    })
    this.props.history.push('/')
  }


  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  render() {
    return(
      <div>
      <form onSubmit={this.editUnit}>
        Name:<br/>
        <input value={this.state.name} type="text" name="name"  autoComplete="off" onChange={this.handleChange}/><br/>

        Description:<br/>
        <input value={this.state.description} type="text" name="description"  autoComplete="off" onChange={this.handleChange}/><br/>

        Ablities:<br/>
        <input value={this.state.abilities} type="text" name="abilities"  autoComplete="off" onChange={this.handleChange}/><br/>

        Movement:<br/>
        <input value={this.state.movement} type="text" name="movement"  autoComplete="off" onChange={this.handleChange}/><br/>

        Range:<br/>
        <input value={this.state.range} type="text" name="range"  autoComplete="off" onChange={this.handleChange}/><br/>

        Attack Skill:<br/>
        <input value={this.state.as} type="text" name="as"  autoComplete="off" onChange={this.handleChange}/><br/>

        Ballistic Skill:<br/>
        <input value={this.state.bs} type="text" name="bs"  autoComplete="off" onChange={this.handleChange}/><br/>

        Attacks:<br/>
        <input value={this.state.attacks} type="text" name="attacks"  autoComplete="off" onChange={this.handleChange}/><br/>

        Armor:<br/>
        <input value={this.state.armor} type="text" name="armor"  autoComplete="off" onChange={this.handleChange}/><br/>

        Wounds:<br/>
        <input value={this.state.wounds} type="text" name="wounds"  autoComplete="off" onChange={this.handleChange}/><br/>

        Points:<br/>
        <input value={this.state.points} type="text" name="points"  autoComplete="off" onChange={this.handleChange}/><br/>

        Army Id:<br/>
        <input value={this.state.army_id} type="text" name="army_id" autoComplete="off" onChange={this.handleChange}/><br/>

        <input type="submit" name="submit"/>
      </form>
      </div>
    )
  }
}

export default withRouter(EditUnit)
