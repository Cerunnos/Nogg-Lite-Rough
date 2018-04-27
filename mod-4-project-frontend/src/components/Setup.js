import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchBuildData,addBuilds,addToPlayer1Army,addToPlayer2Army,fetchUnitData,addToPlayer1List,addToPlayer2List,setPlayer1Activations,setPlayer2Activations} from '../Redux/actions'

import Board from '../board/Board'

import './Setup.css'

class Setup extends Component {

  componentDidMount(){
    this.props.dispatch(fetchUnitData('http://localhost:3000/units'))
    this.props.dispatch(fetchBuildData('http://localhost:3000/armylists'))
  }

  handlePlayer1Build=(e)=>{
    let splitString=e.target.value.split(",")
    let parseArray=splitString.map((id)=>{
      return parseInt(id,10)
    })
    parseArray.forEach((id)=>{
      let unitMatch=this.props.store.units.find((unit)=>{
        return unit.id===id
      })
      this.props.dispatch(addToPlayer1Army(unitMatch))
      this.props.dispatch(addToPlayer1List(unitMatch))
      // this.props.dispatch(setPlayer1Activations(unitMatch))
    })
  }

  handlePlayer2Build=(e)=>{
    let splitString=e.target.value.split(",")
    let parseArray=splitString.map((id)=>{
      return parseInt(id,10)
    })
    parseArray.forEach((id)=>{
      let unitMatch=this.props.store.units.find((unit)=>{
        return unit.id===id
      })
      this.props.dispatch(addToPlayer2Army(unitMatch))
      this.props.dispatch(addToPlayer2List(unitMatch))
      // this.props.dispatch(setPlayer2Activations(unitMatch))
    })
  }

  render() {
    let renderPlayer1Builds=this.props.store.builds.map((build)=>{
      return <option value={build.unit_ids}>{build.name}</option>
    })

    let renderPlayer2Builds=this.props.store.builds.map((build)=>{
      return <option value={build.unit_ids}>{build.name}</option>
    })
    return(
      <div className="setup">
        <h2>Game Setup</h2>
        <h3>Player1 Build:</h3>
        <select onChange={this.handlePlayer1Build}>
          {renderPlayer1Builds}
        </select><br/><br/>
        <h3>Player2 Build</h3>
        <select onChange={this.handlePlayer2Build}>
          {renderPlayer2Builds}
        </select><br/><br/>
        <Link to='board'>Start Game</Link><br/><br/>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    store: state
  };
};

export default connect(mapStateToProps)(Setup);
