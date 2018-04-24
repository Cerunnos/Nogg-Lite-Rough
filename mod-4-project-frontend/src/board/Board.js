import React, { Component } from 'react';
import Row from './Row'
import InfoBar from './InfoBar'
import BottomBar from './BottomBar'
import './Board.css'

import {connect} from 'react-redux'
import {
  fetchUnitData,setCurrentlySelected,addToPlayer1Army,addToPlayer2Army,filterArmy1,filterArmy2,tallyActivations,reduceActivations,incrementRounds, setTotalActivations,resetActivations,thunkTest,switchTurn
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
    // console.log(filteredList)
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
    console.log(filteredList)
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

  //8 moves
      let moves1=(
        (nX===cX+1 && nY===cY+1) ||
        (nX===cX+1 && nY===cY-1) ||
        (nX===cX-1 && nY===cY+1) ||
        (nX===cX-1 && nY===cY-1) ||
        (nX===cX+1 && nY===cY) ||
        (nX===cX-1 && nY===cY) ||
        (nX===cX && nY===cY+1) ||
        (nX===cX && nY===cY-1)
      )
  //16 moves
      let moves2=(
        (nX===cX+2 && nY===cY+2) ||
        (nX===cX+2 && nY===cY+1) ||
        (nX===cX+2 && nY===cY) ||
        (nX===cX+2 && nY===cY-1) ||
        (nX===cX+2 && nY===cY-2) ||
        (nX===cX+1 && nY===cY+2) ||
        (nX===cX && nY===cY+2) ||
        (nX===cX-1 && nY===cY+2) ||

        (nX===cX-2 && nY===cY+2) ||
        (nX===cX-2 && nY===cY-2) ||
        (nX===cX && nY===cY-2) ||
        (nX===cX-2 && nY===cY) ||
        (nX===cX-1 && nY===cY-2) ||
        (nX===cX-2 && nY===cY-1) ||
        (nX===cX-2 && nY===cY+1) ||
        (nX===cX+1 && nY===cY-2)
      )
  //24 moves
      let moves3=(
        (nX===cX+3 && nY===cY+3) ||
        (nX===cX+3 && nY===cY+2) ||
        (nX===cX+3 && nY===cY+1) ||
        (nX===cX+3 && nY===cY) ||
        (nX===cX+2 && nY===cY+3) ||
        (nX===cX+1 && nY===cY+3) ||
        (nX===cX && nY===cY+3) ||
        (nX===cX-3 && nY===cY-3) ||

        (nX===cX-3 && nY===cY-2) ||
        (nX===cX-3 && nY===cY-1) ||
        (nX===cX-3 && nY===cY) ||
        (nX===cX-2 && nY===cY-3) ||
        (nX===cX-1 && nY===cY-3) ||
        (nX===cX && nY===cY-3) ||
        (nX===cX && nY===cY) ||
        (nX===cX+3 && nY===cY-1) ||

        (nX===cX+3 && nY===cY-2) ||
        (nX===cX+3 && nY===cY-3) ||
        (nX===cX+2 && nY===cY-3) ||
        (nX===cX+1 && nY===cY-3) ||
        (nX===cX-3 && nY===cY+1) ||
        (nX===cX-3 && nY===cY+2) ||
        (nX===cX-3 && nY===cY+3) ||
        (nX===cX-1 && nY===cY+3)
      )
  //32 moves
      let moves4=(
        (nX===cX+4 && nY===cY+4) ||
        (nX===cX+4 && nY===cY+3) ||
        (nX===cX+4 && nY===cY+2) ||
        (nX===cX+4 && nY===cY+1) ||
        (nX===cX+4 && nY===cY) ||
        (nX===cX+4 && nY===cY-1) ||
        (nX===cX+4 && nY===cY-2) ||
        (nX===cX+4 && nY===cY-3) ||

        (nX===cX+4 && nY===cY-4) ||
        (nX===cX+3 && nY===cY-4) ||
        (nX===cX+2 && nY===cY-4) ||
        (nX===cX+1 && nY===cY-4) ||
        (nX===cX && nY===cY-4) ||
        (nX===cX-1 && nY===cY-4) ||
        (nX===cX-2 && nY===cY-4) ||
        (nX===cX-3 && nY===cY-4) ||

        (nX===cX-4 && nY===cY-4) ||
        (nX===cX-4 && nY===cY-3) ||
        (nX===cX-4 && nY===cY-2) ||
        (nX===cX-4 && nY===cY-1) ||
        (nX===cX-4 && nY===cY) ||
        (nX===cX-4 && nY===cY+1) ||
        (nX===cX-4 && nY===cY+2) ||
        (nX===cX-4 && nY===cY+3) ||

        (nX===cX-4 && nY===cY+4) ||
        (nX===cX-3 && nY===cY+4) ||
        (nX===cX-2 && nY===cY+4) ||
        (nX===cX-1 && nY===cY+4) ||
        (nX===cX && nY===cY+4) ||
        (nX===cX+1 && nY===cY+4) ||
        (nX===cX+2 && nY===cY+4) ||
        (nX===cX+3 && nY===cY+4)
      )
  //40 moves
      let moves5=(
        (nX===cX+5 && nY===cY+5) ||
        (nX===cX+5 && nY===cY+4) ||
        (nX===cX+5 && nY===cY+3) ||
        (nX===cX+5 && nY===cY+2) ||
        (nX===cX+5 && nY===cY+1) ||
        (nX===cX+5 && nY===cY) ||
        (nX===cX+5 && nY===cY-1) ||
        (nX===cX+5 && nY===cY-2) ||

        (nX===cX+5 && nY===cY-3) ||
        (nX===cX+5 && nY===cY-4) ||
        (nX===cX+5 && nY===cY-5) ||
        (nX===cX+4 && nY===cY-5) ||
        (nX===cX+3 && nY===cY-5) ||
        (nX===cX+2 && nY===cY-5) ||
        (nX===cX+1 && nY===cY-5) ||
        (nX===cX && nY===cY-5) ||

        (nX===cX-1 && nY===cY-5) ||
        (nX===cX-2 && nY===cY-5) ||
        (nX===cX-3 && nY===cY-5) ||
        (nX===cX-4 && nY===cY-5) ||
        (nX===cX-5 && nY===cY-5) ||
        (nX===cX-5 && nY===cY-4) ||
        (nX===cX-5 && nY===cY-3) ||
        (nX===cX-5 && nY===cY-2) ||

        (nX===cX-5 && nY===cY-1) ||
        (nX===cX-5 && nY===cY) ||
        (nX===cX-5 && nY===cY+1) ||
        (nX===cX-5 && nY===cY+2) ||
        (nX===cX-5 && nY===cY+3) ||
        (nX===cX-5 && nY===cY+4) ||
        (nX===cX-5 && nY===cY+5) ||
        (nX===cX-4 && nY===cY+5) ||

        (nX===cX-3 && nY===cY+5) ||
        (nX===cX-2 && nY===cY+5) ||
        (nX===cX-1 && nY===cY+5) ||
        (nX===cX && nY===cY+5) ||
        (nX===cX+1 && nY===cY+5) ||
        (nX===cX+2 && nY===cY+5) ||
        (nX===cX+3 && nY===cY+5) ||
        (nX===cX+4 && nY===cY+5)

      )
  //48 moves
      let moves6=(
        (nX===cX+6 && nY===cY+6) ||
        (nX===cX+6 && nY===cY+5) ||
        (nX===cX+6 && nY===cY+4) ||
        (nX===cX+6 && nY===cY+3) ||
        (nX===cX+6 && nY===cY+2) ||
        (nX===cX+6 && nY===cY+1) ||
        (nX===cX+6 && nY===cY) ||
        (nX===cX+6 && nY===cY-1) ||

        (nX===cX+6 && nY===cY-2) ||
        (nX===cX+6 && nY===cY-3) ||
        (nX===cX+6 && nY===cY-4) ||
        (nX===cX+6 && nY===cY-5) ||
        (nX===cX+6 && nY===cY-6) ||
        (nX===cX+5 && nY===cY-6) ||
        (nX===cX+4 && nY===cY-6) ||
        (nX===cX+3 && nY===cY-6) ||

        (nX===cX+2 && nY===cY-6) ||
        (nX===cX+1 && nY===cY-6) ||
        (nX===cX && nY===cY-6) ||
        (nX===cX-1 && nY===cY-6) ||
        (nX===cX-2 && nY===cY-6) ||
        (nX===cX-3 && nY===cY-6) ||
        (nX===cX-4 && nY===cY-6) ||
        (nX===cX-5 && nY===cY-6) ||

        (nX===cX-6 && nY===cY-6) ||
        (nX===cX-6 && nY===cY-5) ||
        (nX===cX-6 && nY===cY-4) ||
        (nX===cX-6 && nY===cY-3) ||
        (nX===cX-6 && nY===cY-2) ||
        (nX===cX-6 && nY===cY-1) ||
        (nX===cX-6 && nY===cY) ||
        (nX===cX-6 && nY===cY+1) ||

        (nX===cX-6 && nY===cY+2) ||
        (nX===cX-6 && nY===cY+3) ||
        (nX===cX-6 && nY===cY+4) ||
        (nX===cX-6 && nY===cY+5) ||
        (nX===cX-6 && nY===cY+6) ||
        (nX===cX-5 && nY===cY+6) ||
        (nX===cX-4 && nY===cY+6) ||
        (nX===cX-3 && nY===cY+6) ||

        (nX===cX-2 && nY===cY+6) ||
        (nX===cX-1 && nY===cY+6) ||
        (nX===cX && nY===cY+6) ||
        (nX===cX+1 && nY===cY+6) ||
        (nX===cX+2 && nY===cY+6) ||
        (nX===cX+3 && nY===cY+6) ||
        (nX===cX+4 && nY===cY+6) ||
        (nX===cX+5 && nY===cY+6)
      )

      let moveset1=(moves1)
      let moveset2=(moves1 || moves2)
      let moveset3=(moves1 || moves2 || moves3)
      let moveset4=(moves1 || moves2 || moves3 || moves4)
      let moveset5=(moves1 || moves2 || moves3 || moves4 || moves5)
      let moveset6=(moves1 || moves2 || moves3 || moves4 || moves5 || moves6)

      //reset on select
      let currentMoveset=moveset3

      if (this.state.currPiece.state.unit.movement===1){
        currentMoveset=moveset1
      }
      else if (this.state.currPiece.state.unit.movement===2){
        currentMoveset=moveset2
      }else if (this.state.currPiece.state.unit.movement===3){
        currentMoveset=moveset3
      }else if (this.state.currPiece.state.unit.movement===4){
        currentMoveset=moveset4
      }else if (this.state.currPiece.state.unit.movement===5){
        currentMoveset=moveset5
      }else if (this.state.currPiece.state.unit.movement===6){
        currentMoveset=moveset6
      }

      if (this.state.currPiece.state.selected && nextPiece.state.active && nextPiece !== this.state.currPiece){
        if (moveset1 && nextPiece.state.armyNumber !== this.state.currPiece.state.armyNumber && this.state.currPiece.state.attackPhase===1){
          nextPiece.deselect()
          this.calculateDamage(this.state.currPiece,nextPiece)
          this.state.currPiece.useAttackPhase()
          this.state.currPiece.deselect()
        }else{
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
      else if (this.props.store.currentlySelected && currentMoveset && this.state.currPiece.state.movementPhase===1) {
        this.state.currPiece.disable()
        nextPiece.enable(this.props.store.currentlySelected)
        nextPiece.select()
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
    // this.setState({
    //   currentlySelected: piece
    // })
    this.props.dispatch(setCurrentlySelected(piece))
  }

  testingThisFunc=()=>{
    if (this.props.store.activations<=0){
      this.props.dispatch(incrementRounds())
      this.props.dispatch(resetActivations())
      this.props.dispatch(switchTurn(1))
    }
  }

  handleEndActivation=()=>{
    if (this.props.store.currentlySelected){
      this.props.dispatch(thunkTest()).then(this.testingThisFunc)
      this.props.store.currentlySelected.deselect()
      if (this.props.store.playerTurn===1){
        this.props.dispatch(switchTurn(2))
      }
      else if (this.props.store.playerTurn===2){
        this.props.dispatch(switchTurn(1))
      }
    }
    else{
      console.log("No Units Selected")
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
