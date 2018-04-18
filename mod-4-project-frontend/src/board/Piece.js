import React, { Component } from 'react';
import './Piece.css'

import {connect} from 'react-redux'
import {addLog} from '../Redux/actions'
import rootReducer from '../Redux/rootReducer'
import store from '../index'

class Piece extends Component {
  state={
    active:false,
    selected:false,
    unit:null,
    counter:0, //initial set
    hp:0,
    armyNumber:0,
    movementPhase:1,
    attackPhase:1,
    activated:false

  }

  handleClick=(e)=>{
    // if(this.state.active===true && this.state.selected===false){
    //   this.select()
    // }
    // else if(this.state.active===true && this.state.selected===true){
    //   this.deselect()
    // }
    this.props.handleLogic(this)
  }

  disable=()=>{
    this.setState({
      active:false,
      selected:false
    },()=>this.props.setCurrentlySelected(null))
  }

  enable=(piece)=>{
    if(piece.state.unit){
      this.setState({
        active:true,
        unit:piece.state.unit,
        hp:piece.state.unit.wounds,
        armyNumber:piece.state.armyNumber,
        movementPhase:piece.state.movementPhase,
        attackPhase:piece.state.attackPhase
      })
    }else{
      this.setState({
        active:true,
        unit:piece.props.unit,
        hp:piece.props.unit.wounds
      })
    }
  }

  deselect=()=>{
    this.setState({
      selected:false
    })
  }

  select=()=>{
    this.setState({
      selected:true
    },()=>this.props.setCurrentlySelected(this))
  }

  applyWounds=()=>{
    this.setState({
      hp:this.state.hp-1
    },()=>this.mortalityCheck(),
          console.log("HP:",this.state.hp-1)
        )
  }

  mortalityCheck=()=>{
    if (this.state.hp<=0){
      this.disable()
    }
  }

  setArmyNumber=(num)=>{
    this.setState({
      armyNumber:num
    })
  }

  useMovementPhase=()=>{
    this.setState({
      movementPhase:0
    })
  }

  useAttackPhase=()=>{
    this.setState({
      attackPhase:0
    })
  }

  activated=()=>{
    this.setState({
      activated:true
    },()=>console.log(this.state.activated))
  }

  activeOrNot=()=>{
    let coordArray=[]
    const getCoords=this.props.pieceState[0].forEach((unit)=>{
      coordArray.push(unit.coordinates)
    })
    if(coordArray.includes(this.props.coordinates)){
      this.setState({
        active:true
      })
    }
  }

  // componentDidMount(){
  //   this.activeOrNot()
  // }

//What passes for piece graphics...
  pieceIcon=()=>{
    if(this.state.unit !== null){
      //Longship Mercs
      if (this.state.active && this.state.selected && this.state.unit.name=="Longship Mercs" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Longship Mercs" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if (this.state.active && this.state.selected && this.state.unit.name=="Longship Mercs"){
        return <div className="selected"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Longship Mercs"){
        return <div className="army2"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }
      //Magus
      else if(this.state.active && this.state.selected && this.state.unit.name=="Magus" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Magus" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name=="Magus"){
        return <div className="selected"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Magus"){
        return <div className="army2"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }
      //Aspirant
      else if(this.state.active && this.state.selected && this.state.unit.name=="Aspirant" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Aspirant" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name=="Aspirant"){
        return <div className="selected"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Aspirant"){
        return <div className="army2"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }
        //Hvraskr
      else if(this.state.active && this.state.selected && this.state.unit.name=="Hvraskr" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Hvraskr" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30" /></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name=="Hvraskr"){
        return <div className="selected"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Hvraskr"){
        return <div className="army2"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30" /></div>
      }
      //Companion
      else if(this.state.active && this.state.selected && this.state.unit.name=="Companion" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Companion" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30" /></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name=="Companion"){
        return <div className="selected"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name=="Companion"){
        return <div className="army2"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30" /></div>
      }
        //Empty
      else{
        return "0"
      }
    }else{
      return "0"
    }
  }

  render() {
    return (
      <div className="piece" id={this.props.coordinates} onClick={this.handleClick}>
      {this.pieceIcon()}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    units:state
  };
};

export default connect(mapStateToProps)(Piece);
