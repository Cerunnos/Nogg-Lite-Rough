import React, { Component } from 'react';
import Row from './Row'
import InfoBar from './InfoBar'
import BottomBar from './BottomBar'
import './Board.css'
import movement from '../movement'
import determineLoS from '../LoS'
import parseCoordinates from '../LoS'

import {connect} from 'react-redux'
import {
  fetchUnitData,setCurrentlySelected,addToPlayer1Army,addToPlayer2Army,filterArmy1,filterArmy2,tallyActivations,reduceActivations,incrementRounds, setTotalActivations,resetActivations,thunkTest,switchTurn,setPlayer1Pieces,setPlayer2Pieces,setNewPieces1,setNewPieces2,setCardinals
} from '../Redux/actions'

class Board extends Component {
  state={
    currPiece: null
  }
//Fetch
  componentDidMount(){
    fetch('http://localhost:3000/units')
      .then(res=>res.json())
      .then(json=>{
        this.setState({
          units: json
        })
      })
      this.props.dispatch(fetchUnitData('http://localhost:3000/units'))
  }

  calculateDamage=(piece1,piece2)=>{
    const roll1=(1+Math.floor(Math.random()*6))
    const roll2=(1+Math.floor(Math.random()*6))
    const statline1=piece1.state.unit
    const statline2=piece2.state.unit
    const as=statline1.as
    const ar=statline2.armor
    console.log("Attack Roll",roll1)
    if (roll1>=as){
      console.log("Defense Roll",roll2)
      if(roll2<ar){
        piece2.applyWounds()
      }
    }
  }

  calculateRangedDamage=(piece1,piece2)=>{
    const roll1=(1+Math.floor(Math.random()*6))
    const roll2=(1+Math.floor(Math.random()*6))
    const statline1=piece1.state.unit
    const statline2=piece2.state.unit
    const bs=statline1.bs
    const ar=statline2.armor
    console.log("Ranged Roll",roll1)
    if (roll1>=bs){
      console.log("Defense Roll",roll2)
      if(roll2<ar){
        piece2.applyWounds()
      }
    }
  }

  //Start Setup Armies 1 and 2
  reduceList1=()=>{
    let counter=0
    let filteredList=[]
    let filterName=this.props.store.player1Army[0].name
    this.props.store.player1Army.map((unit)=>{
      if (unit.name===filterName && counter==0){
        counter++
      }else{
        filteredList.push(unit)
      }
    })
    this.props.dispatch(filterArmy1(filteredList))
    this.props.dispatch(tallyActivations())
    this.props.dispatch(setTotalActivations())
  }

  reduceList2=()=>{

    let counter=0
    let filteredList=[]
    let filterName=this.props.store.player2Army[0].name
    this.props.store.player2Army.map((unit)=>{
      if (unit.name===filterName && counter==0){
        counter++
      }else{
        filteredList.push(unit)
      }
    })
    this.props.dispatch(filterArmy2(filteredList))
    this.props.dispatch(tallyActivations())
    this.props.dispatch(setTotalActivations())
  }


  setToNull1=()=>{
    if (this.props.store.player1Army.length>0)
      this.setState({
        currPiece:null
      })
  }

  setToNull2=()=>{
    if (this.props.store.player2Army.length>0)
      this.setState({
        currPiece:null
      })
  }
  //End Setup Armies 1 and 2

// Block 1-Logic
  handleLogic = (nextPiece) => {
    console.log(this.props.store.cardinals)
    let nCoords=nextPiece.props.coordinates
    let nSplit=nCoords.split(',')
    let nX=parseInt(nSplit[0],10)
    let nY=parseInt(nSplit[1],10)
    // let nNum=[nX,nY]
    let cCoords=[]
    let cSplit=''
    let cX=''
    let cY=''
    // let cNum=[cX,cY]

    //Select Logic
    if(nextPiece.state.active===true && nextPiece.state.selected===false){
      if (nextPiece.state.armyNumber===this.props.store.playerTurn){
        nextPiece.select()
      }
    }
    else if(nextPiece.state.active===true && nextPiece.state.selected===true){
      nextPiece.deselect()
    }
    //Selecte Logic End


    //Setup Pieces
    if (this.state.currPiece===null && this.props.store.player1Army.length>0){
      this.props.dispatch(setPlayer1Pieces(nextPiece))
      this.setState({
        currPiece:nextPiece
      },()=>
        this.state.currPiece.enable(this.props.store.player1Army[0],
        this.state.currPiece.setArmyNumber(1),
        this.reduceList1(),
        this.setToNull1()
        )
      )
    }
    else if(this.state.currPiece===null && this.props.store.player2Army.length>0){
      this.props.dispatch(setPlayer2Pieces(nextPiece))
      this.setState({
        currPiece:nextPiece
      },()=>
        this.state.currPiece.enable(this.props.store.player2Army[0],
        this.state.currPiece.setArmyNumber(2),
        this.reduceList2(),
        this.setToNull2()
        )
      )
    }
    //Setup Pieces End

    //If there is a Current Piece
    else if(this.state.currPiece && this.state.currPiece.state.active===true && this.state.currPiece.state.activated===false){
      cCoords.push(this.state.currPiece.props.coordinates)
      cSplit=cCoords[0].split(',')
      cX=parseInt(cSplit[0],10)
      cY=parseInt(cSplit[1],10)
      // cNum=[cX,cY]

      //reset on select
      let currentMoveset=movement(this.state.currPiece.state.unit.movement,nX,nY,cX,cY)
      let currentLoS=determineLoS(this.props.store.terrainLocations,this.state.currPiece.props.coordinates)
      let cardinalConstraints=null
      if (this.props.store.currentlySelected && this.props.store.currentlySelected.state.activated===false){
        let currentCoordArray=this.props.store.currentlySelected.props.coordinates.split(",")
        let currentParsedArray=currentCoordArray.map((element)=>{
          return parseInt(element,10)
        })
        let currentX=currentParsedArray[0]
        let currentY=currentParsedArray[1]
        let currentCoordinates=[currentX,currentY]
        let nextCoordArray=nextPiece.props.coordinates.split(",")
        let nextParsedArray=nextCoordArray.map((element)=>{
          return parseInt(element,10)
        })
        let nextX=nextParsedArray[0]
        let nextY=nextParsedArray[1]
        let nextCoordinates=[nextX,nextY]
        let cardinals=this.props.store.cardinals
        if (this.props.store.currentlySelected.state.unit !== null && cardinals.north){
          cardinalConstraints=(
            (nextY>cardinals.north[1] || cardinals.north.length<1) &&
            (nextY<cardinals.south[1] || cardinals.south.length<1) &&
            (nextX<cardinals.east[0] || cardinals.east.length<1) &&
            (nextX>cardinals.west[0] || cardinals.west.length<1) &&
            ((nextX<cardinals.northEast[0] || nextY>cardinals.northEast[1]) || cardinals.northEast.length<1) &&
            ((nextX<cardinals.southEast[0] || nextY<cardinals.southEast[1]) || cardinals.southEast.length<1) &&
            ((nextX>cardinals.southWest[0] || nextY<cardinals.southWest[1]) || cardinals.southWest.length<1) &&
            ((nextX>cardinals.northWest[0] || nextY>cardinals.northWest[1]) || cardinals.northWest.length<1)
          )
        }
      }
      let currentRange=movement(this.state.currPiece.state.unit.range,nX,nY,cX,cY,cardinalConstraints)
      if (this.state.currPiece.state.selected && nextPiece.state.active && nextPiece !== this.state.currPiece){
        if (currentRange && currentRange===movement(1,nX,nY,cX,cY) && nextPiece.state.armyNumber !== this.state.currPiece.state.armyNumber && this.state.currPiece.state.attackPhase===1){
          nextPiece.deselect()
          this.calculateDamage(this.state.currPiece,nextPiece)
          this.state.currPiece.useAttackPhase()
          this.state.currPiece.deselect()
        }
        else if(currentRange && currentRange !== movement(1,nX,nY,cX,cY) && nextPiece.state.armyNumber !== this.state.currPiece.state.armyNumber && this.state.currPiece.state.attackPhase===1){
          nextPiece.deselect()
          this.calculateRangedDamage(this.state.currPiece,nextPiece)
          this.state.currPiece.useAttackPhase()
          this.state.currPiece.deselect()
        }
        else{
          this.state.currPiece.deselect()
        }
      }

      if (nextPiece.state.active===true){
        this.setState({
          currPiece:nextPiece
        })
      }
      else if (nextPiece === this.state.currPiece) {
        return
      }
      else if (this.props.store.currentlySelected && currentMoveset && this.state.currPiece.state.movementPhase===1 && nextPiece.state.terrain===false) {
        this.state.currPiece.disable()
        nextPiece.enable(this.props.store.currentlySelected)
        if (this.state.currPiece.state.armyNumber===1){
          let oldPieceCoords=this.state.currPiece.props.coordinates
          let pieceArray=[]
          let newPieces=this.props.store.player1Pieces.forEach((piece)=>{
            if (!(piece.props.coordinates===oldPieceCoords)){
              pieceArray.push(piece)
            }
          })
          pieceArray.push(nextPiece)
          this.props.dispatch(setNewPieces1(pieceArray))
        }
        else if (this.state.currPiece.state.armyNumber===2){
          let oldPieceCoords=this.state.currPiece.props.coordinates
          let pieceArray=[]
          let newPieces=this.props.store.player2Pieces.forEach((piece)=>{
            if (!(piece.props.coordinates===oldPieceCoords)){
              pieceArray.push(piece)
            }
          })
          pieceArray.push(nextPiece)
          this.props.dispatch(setNewPieces2(pieceArray))
        }
        // nextPiece.select()
        this.setCurrentlySelected(null)
        nextPiece.useMovementPhase()
        this.setState({currPiece: nextPiece})
      }
    }
    //If there is a Current Piece End

    //If there is no Current Piece
    else{
      this.setState({
        currPiece: nextPiece
      })
    }
    //If there is no Current Piece End
  }
  //Block1 end

//Grab Selected
  setCurrentlySelected=(piece)=>{
    this.props.dispatch(setCurrentlySelected(piece))
  }

  nextRound=()=>{
    if (this.props.store.activations<=0){
      this.props.dispatch(incrementRounds())
      this.props.dispatch(resetActivations())
    }
  }

  checkActivations=(pieceArray)=>{
    let truthArray=pieceArray.map((piece)=>{
      return piece.state.activated
    })
    if (!(truthArray.includes(false))){
      return true
    }else{
      return false
    }
  }

  handleEndActivation=()=>{
    if (this.props.store.currentlySelected){
      this.props.store.currentlySelected.activated()
      this.props.dispatch(thunkTest()).then(this.nextRound)
      this.props.store.currentlySelected.deselect()
      if (this.props.store.playerTurn===1){
        if (this.checkActivations(this.props.store.player2Pieces)){
          this.props.dispatch(switchTurn(1))
        }else{
          this.props.dispatch(switchTurn(2))
        }
      }
      else if (this.props.store.playerTurn===2){
        if (this.checkActivations(this.props.store.player1Pieces)){
          this.props.dispatch(switchTurn(2))
        }else{
          this.props.dispatch(switchTurn(1))
        }
      }
    }
    else{

    }
  }

  hotkey=(e)=>{
    if (e.keyCode===32){
      this.handleEndActivation()
    }
  }

  componentDidMount(){
    window.addEventListener("keydown",this.hotkey)
  }

  render() {
    let rows = []
    for (var i = 0; i < 23; i++) {
      rows.push(<Row handleLogic={this.handleLogic} yCoord={(i)} key={i}/>)
    }
    return (
      <div className="board" onClick={this.handleClick}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
        <InfoBar onSet={this.onSet} currentlySelected={this.state.currentlySelected} playerTurn={this.state.playerTurn} handleEndActivation={this.handleEndActivation}/>
      </div>
    );
  }
}

const mapStateToProps=state=>{
  return {
    store: state
  };
};

export default connect(mapStateToProps)(Board);
