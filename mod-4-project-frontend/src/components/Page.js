import React, { Component } from 'react';
import {Route} from 'react-router-dom'
// import {connect} from 'react-redux'
import Navbar from './Navbar'
import ListArmies from './ListArmies'
import CreateUnit from './CreateUnit'
import Board from '../board/Board'
import MenuContainer from './MenuContainer'
import Setup from './Setup'
import ListArmylists from './ListArmylists'
// import {fetchBuildData,addBuilds} from '../Redux/actions'

// import Builder from './Builder'
import './Page.css'

// let cuid = require('cuid')

class Page extends Component {
  state={
    armies:[],
    units:[],
    selectedUnits:[],
    currentArmy:"empty",
    currentUnit:"empty",
    // player1Army:[],
    // player2Army:[]
  }

  componentDidMount(){
  fetch('http://localhost:3000/armies')
    .then(res=>res.json())
    .then(json=>{
      this.setState({
        armies:json
      })
    })
    fetch('http://localhost:3000/units')
      .then(res=>res.json())
      .then(json=>{
        this.setState({
          units: json,
        })
      })
      // this.props.dispatch(fetchBuildData('http://localhost:3000/armylists'))

  }

  addNewUnit = (newUnit) => {
    this.setState({units: [...this.state.units, newUnit]})
  }

  removeUnit=(id)=>{
    let filteredUnits = this.state.units.filter((unit)=> unit.id != id )
    this.setState({
      units: filteredUnits
    })
  }

  handleUnitClick=(e)=>{
    let id=e.target.id
    let allUnits=this.state.units
    for(let i=0;i<allUnits.length;i++){
      if (allUnits[i].id==id){
        this.setState({
          currentUnit:allUnits[i]
        })
      }
    }
  }

  reset=(editedUnit,id)=>{
    let filteredUnits = this.state.units.filter((unit)=> unit.id != id )
    this.setState({
      units:[...filteredUnits,editedUnit]
    })
  }

  // setArmyLists=(unit,e)=>{
  //   let army=e.target.value
  //   if (army==1){
  //     let newState1=this.state.player1Army
  //     newState1.push(unit)
  //     this.setState({
  //       player1Army:newState1
  //     })
  //   }else if (army==2){
  //     let newState2=this.state.player2Army
  //     newState2.push(unit)
  //     this.setState({
  //       player2Army:newState2
  //     })
  //   }
  // }

  render() {
    // <Route exact path="/board" render={()=><Board player1Army={this.state.player1Army} player2Army={this.state.player2Army}/>}/>
    return(
    <div>
      <div className="container">
        <Navbar/>
        <div className='row'>
          <Route exact path="/armies" render={() => <ListArmies armies={this.state.armies} units={this.state.units} removeUnit={this.removeUnit} reset={this.reset}/>}/>
        </div>
        <Route exact path="/createUnit" render={() => <CreateUnit addNewUnit={this.addNewUnit}/>}/>
        <Route exact path="/armylists" render={() => <ListArmylists/>}/>
        <Route exact path="/" render={() => <MenuContainer/>}/>
      </div>
        <Route exact path="/setup" render={()=><Setup/>}/>
        <Route exact path="/board" render={()=><Board player1Army={this.state.player1Army} player2Army={this.state.player2Army}/>}/>
    </div>
    )
  }
}

export default Page
// const mapStateToProps=state=>{
//   return {
//     store: state
//   };
// };
//
// export default connect(mapStateToProps)(Page);
