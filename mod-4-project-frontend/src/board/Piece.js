import React, { Component } from 'react';
import {setCurrentlySelected,thunkTest,reduceTotalActivations,removeFromPlayer2List,removeFromPlayer1List} from '../Redux/actions'

import './Piece.css'

import {connect} from 'react-redux'
import movement from '../movement'

class Piece extends Component {
  state={
    active:false,
    selected:false,
    unit:null,
    hp:0,
    armyNumber:0,
    movementPhase:1,
    attackPhase:1,
    activated:false

  }

  handleClick=(e)=>{
    this.props.handleLogic(this)
  }

  disable=()=>{
    this.setState({
      active:false,
      selected:false,
      unit:null
    })

  }

  enable=(piece)=>{
    if (piece.name){
      this.setState({
        active:true,
        unit:piece,
        hp:piece.wounds
      })
    }
    else if(piece.state && piece.state.unit){
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
    this.props.dispatch(setCurrentlySelected(null))
    this.setState({
      selected:false
    })
  }

  select=()=>{
    this.props.dispatch(setCurrentlySelected(this))
    this.setState({
      selected:true
    })
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
      // this.props.dispatch(reduceActivations())
      this.props.dispatch(reduceTotalActivations())
      if (this.state.activated===false){
        this.props.dispatch(thunkTest()).then(console.log(this.props.store.activations))
      }
      if (this.state.armyNumber===1){
        let counter=0
        let filteredList=[]
        let filterName=this.props.store.player1List[0].name
        this.props.store.player1List.map((unit)=>{
          if (unit.name===filterName && counter==0){
            counter++
          }else{
            filteredList.push(unit)
          }
        })
        this.props.dispatch(removeFromPlayer1List(filteredList))

      }
      else if (this.state.armyNumber===2){
        let counter=0
        let filteredList=[]
        let filterName=this.props.store.player2List[0].name
        this.props.store.player2List.map((unit)=>{
          if (unit.name===filterName && counter==0){
            counter++
          }else{
            filteredList.push(unit)
          }
        })
        this.props.dispatch(removeFromPlayer2List(filteredList))
      }
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
    })
  }

//What passes for piece graphics...
  pieceIcon=()=>{
    if (this.state.unit===null){
      if (this.props.store.currentlySelected && this.props.store.currentlySelected.state.movementPhase===1){
        let selectedCoordinates=this.props.store.currentlySelected.props.coordinates
        let coordArray=selectedCoordinates.split(",")
        let parsedArray=coordArray.map((element)=>{
          return parseInt(element,10)
        })
        let sX=parsedArray[0]
        let sY=parsedArray[1]

        let selfCoordArray=this.props.coordinates.split(",")
        let selfParsedArray=selfCoordArray.map((element)=>{
          return parseInt(element,10)
        })
        let x=selfParsedArray[0]
        let y=selfParsedArray[1]
        let unitMovement=''
        if (this.props.store.currentlySelected.state.unit)
        unitMovement=this.props.store.currentlySelected.state.unit.movement
        if (movement(unitMovement,x,y,sX,sY)){
          return <div className="highlighted"></div>
        }

        // console.log(this.props.coordinates)
      }
    }
    if(this.state.unit !== null){
      //Longship Mercs
      if (this.state.active && this.state.selected && this.state.unit.name==="Longship Mercs" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Longship Mercs" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if (this.state.active && this.state.selected && this.state.unit.name==="Longship Mercs"){
        return <div className="selected"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Longship Mercs"){
        return <div className="army2"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }
      //Magus
      else if(this.state.active && this.state.selected && this.state.unit.name==="Magus" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Magus" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name==="Magus"){
        return <div className="selected"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Magus"){
        return <div className="army2"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }
      //Aspirant
      else if(this.state.active && this.state.selected && this.state.unit.name==="Aspirant" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Aspirant" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name==="Aspirant"){
        return <div className="selected"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Aspirant"){
        return <div className="army2"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }
        //Hvraskr
      else if(this.state.active && this.state.selected && this.state.unit.name==="Hvraskr" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Hvraskr" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30" /></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name==="Hvraskr"){
        return <div className="selected"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Hvraskr"){
        return <div className="army2"><img src={require("../pictures/goatSkull.png")} alt="ship" width="30" height="30" /></div>
      }
      //Companion
      else if(this.state.active && this.state.selected && this.state.unit.name==="Companion" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Companion" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30" /></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name==="Companion"){
        return <div className="selected"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Companion"){
        return <div className="army2"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30" /></div>
      }
        //Empty
      else{
        return ""
      }
    }else{
      return ""
    }
  }

  render() {
    // console.log(this.props.store)
    if (this.props.store.activations<=0 && (this.state.attackPhase===0 || this.state.movementPhase===0)){
      this.setState({
        movementPhase:1,
        attackPhase:1,
        activated:false
      })
    }
    return (
      <div className="piece" id={this.props.coordinates} onClick={this.handleClick}>
      {this.pieceIcon()}
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store:state
  };
};

export default connect(mapStateToProps)(Piece);
