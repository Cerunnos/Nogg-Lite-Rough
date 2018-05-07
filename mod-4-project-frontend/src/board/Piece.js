import React, { Component } from 'react';
import {setCurrentlySelected,thunkTest,reduceTotalActivations,removeFromPlayer2List,removeFromPlayer1List,setTerrainLocations,setCardinals} from '../Redux/actions'
import {connect} from 'react-redux'
import movement from '../movement'
import determineLoS from '../LoS'
import parseCoordinates from '../parseCoordinates'

import './Piece.css'

class Piece extends Component {
  state={
    active:false,
    selected:false,
    unit:null,
    hp:0,
    armyNumber:0,
    movementPhase:1,
    attackPhase:1,
    activated:false,
    terrain:this.props.terrain

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
    let currentLoS=determineLoS(this.props.store.terrainLocations,this.props.coordinates)
    this.props.dispatch(setCardinals(currentLoS))
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

  componentDidMount(){
    if (this.state.terrain===true){
      this.props.dispatch(setTerrainLocations(this.props.coordinates))
    }
  }

//What passes for piece graphics...
  pieceIcon=()=>{
    if (this.state.unit===null){
      if (this.props.store.currentlySelected && this.props.store.currentlySelected.state.activated===false){
        let currentCoordinates=parseCoordinates(this.props.store.currentlySelected.props.coordinates)
        let currentX=currentCoordinates[0]
        let currentY=currentCoordinates[1]
        let selfCoordinates=parseCoordinates(this.props.coordinates)
        let selfX=selfCoordinates[0]
        let selfY=selfCoordinates[1]
        let unitMovement=''
        let unitRange=''
        let cardinals=this.props.store.cardinals
        let cardinalConstraints=''
        if (this.props.store.currentlySelected.state.unit !== null && cardinals.north){
          cardinalConstraints=(
            ((selfY>cardinals.north[1] || cardinals.north.length<1) &&
            (selfY<cardinals.south[1] || cardinals.south.length<1) &&
            (selfX<cardinals.east[0] || cardinals.east.length<1) &&
            (selfX>cardinals.west[0] || cardinals.west.length<1) &&
            ((selfX<cardinals.northEast[0] || selfY>cardinals.northEast[1]) || cardinals.northEast.length<1) &&
            ((selfX<cardinals.southEast[0] || selfY<cardinals.southEast[1]) || cardinals.southEast.length<1) &&
            ((selfX>cardinals.southWest[0] || selfY<cardinals.southWest[1]) || cardinals.southWest.length<1) &&
            ((selfX>cardinals.northWest[0] || selfY>cardinals.northWest[1]) || cardinals.northWest.length<1)) ||
            (selfY<cardinals.west[1] && selfX<=cardinals.west[0] && selfX>cardinals.northWest[0] && selfY>cardinals.northWest[1]) ||
            (selfY<=cardinals.north[1] && selfX<cardinals.north[0] && selfX>cardinals.northWest[0] && selfY>cardinals.northWest[1]) ||
            (selfY>cardinals.west[1] && selfX<=cardinals.west[0] && selfX>cardinals.southWest[0] && selfY<cardinals.southWest[1]) ||
            (selfY>=cardinals.south[1] && selfX<cardinals.south[0] && selfX>cardinals.southWest[0] && selfY<cardinals.southWest[1]) ||
            (selfY<cardinals.east[1] && selfX>=cardinals.east[0] && selfX<cardinals.northEast[0] && selfY>cardinals.northEast[1]) ||
            (selfY<=cardinals.north[1] && selfX>=cardinals.north[0] && selfX<cardinals.northEast[0] && selfY>cardinals.northEast[1]) ||
            (selfY>cardinals.east[1] && selfX>=cardinals.east[0] && selfX<cardinals.southEast[0] && selfY<cardinals.southEast[1]) ||
            (selfY>=cardinals.south[1] && selfX>=cardinals.south[0] && selfX<cardinals.southEast[0] && selfY<cardinals.southEast[1])
          )
          unitMovement=this.props.store.currentlySelected.state.unit.movement
          unitRange=this.props.store.currentlySelected.state.unit.range
          if (this.state.terrain===false){
            if (this.props.store.currentlySelected.state.movementPhase===1 && this.props.store.currentlySelected.state.attackPhase===1){
              if (unitMovement>=unitRange){
                if (movement(unitRange,selfX,selfY,currentX,currentY,cardinalConstraints)){
                  return <div className="doubleHighlight"></div>
                }
                if (movement(unitMovement,selfX,selfY,currentX,currentY)){
                  return <div className="highlighted"></div>
                }
              }
              else if (unitRange>=unitMovement){
                if (movement(unitMovement,selfX,selfY,currentX,currentY,cardinalConstraints) && movement(unitMovement,selfX,selfY,currentX,currentY)){
                  return <div className="doubleHighlight"></div>
                }
                if (movement(unitMovement,selfX,selfY,currentX,currentY)){
                  return <div className="highlighted"></div>
                }
                if (movement(unitRange,selfX,selfY,currentX,currentY,cardinalConstraints)){
                  return <div className="rangeHighlight"></div>
                }
              }
            }
            else if (this.props.store.currentlySelected.state.attackPhase===1){
              if (movement(unitRange,selfX,selfY,currentX,currentY,cardinalConstraints)){
                return <div className="rangeHighlight"></div>
              }
            }
            else if (this.props.store.currentlySelected.state.movementPhase===1){
              if (movement(unitMovement,selfX,selfY,currentX,currentY,)){
                return <div className="highlighted"></div>
              }
            }
          }
        }
      }
    }
  //
    if(this.state.unit !== null){
      //Longship Mercs
      if (this.state.activated===true && this.state.unit.name==="Longship Mercs" && this.state.armyNumber===1){
        return <div className="army1Activated"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }
      else if (this.state.active && this.state.selected && this.state.unit.name==="Longship Mercs" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Longship Mercs" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }
      else if (this.state.activated===true && this.state.unit.name==="Longship Mercs" && this.state.armyNumber===2){
        return <div className="army2Activated"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }
      else if (this.state.active && this.state.selected && this.state.unit.name==="Longship Mercs"){
        return <div className="selected"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Longship Mercs"){
        return <div className="army2"><img src={require("../pictures/longship.png")} alt="ship" width="30" height="30"/></div>
      }
      //Magus
      else if (this.state.activated===true && this.state.unit.name==="Magus" && this.state.armyNumber===1){
        return <div className="army1Activated"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }
      else if(this.state.active && this.state.selected && this.state.unit.name==="Magus" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Magus" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }
      else if (this.state.activated===true && this.state.unit.name==="Magus" && this.state.armyNumber===2){
        return <div className="army2Activated"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.selected && this.state.unit.name==="Magus"){
        return <div className="selected"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Magus"){
        return <div className="army2"><img src={require("../pictures/tome.png")} alt="ship" width="30" height="30"/></div>
      }
      //Aspirant
      else if (this.state.activated===true && this.state.unit.name==="Aspirant" && this.state.armyNumber===1){
        return <div className="army1Activated"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }
      else if(this.state.active && this.state.selected && this.state.unit.name==="Aspirant" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Aspirant" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
      }
      else if (this.state.activated===true && this.state.unit.name==="Aspirant" && this.state.armyNumber===2){
        return <div className="army2Activated"><img src={require("../pictures/pentagram.png")} alt="ship" width="30" height="30"/></div>
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
      else if (this.state.activated===true && this.state.unit.name==="Companion" && this.state.armyNumber===1){
        return <div className="army1Activated"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
      }
      else if(this.state.active && this.state.selected && this.state.unit.name==="Companion" && this.state.armyNumber===1){
        return <div className="selected"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
      }else if(this.state.active && this.state.unit.name==="Companion" && this.state.armyNumber===1){
        return <div className="army1"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30" /></div>
      }
      else if (this.state.activated===true && this.state.unit.name==="Companion" && this.state.armyNumber===2){
        return <div className="army2Activated"><img src={require("../pictures/companion.png")} alt="ship" width="30" height="30"/></div>
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
    if (this.props.store.activations<=0 && this.state.activated===true){
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
