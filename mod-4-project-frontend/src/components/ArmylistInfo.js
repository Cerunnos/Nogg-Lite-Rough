import React, { Component } from 'react';
import './ArmylistInfo.css'

class ArmylistInfo extends Component {
  handleClick=(e)=>{
    e.preventDefault()

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
    render() {
      let counter=0
      let unitMatch=''
      let splitString=this.props.build.unit_ids.split(",")
      let parseArray=splitString.map((id)=>{
        return parseInt(id,10)
      })
      let renderBuild=parseArray.map((id)=>{
        unitMatch=this.props.units.find((unit)=>{
          return unit.id===id
        })
        counter++
        return <p key={counter}>{unitMatch.name}</p>
      })
    return(
      <div className="ArmylistInfo">
        <ul>
          {renderBuild}
        </ul>
        <button onClick={this.handleClick}>Delete Build</button>
      </div>
    )
  }
}

export default ArmylistInfo
