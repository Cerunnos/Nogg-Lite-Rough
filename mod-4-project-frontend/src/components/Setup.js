import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchBuildData,addBuilds,addToPlayer1Army,addToPlayer2Army,fetchUnitData,addToPlayer1List,addToPlayer2List,setPlayer1Activations,setPlayer2Activations,setMap,clearPlayer1Army,clearPlayer2Army,clearPlayer1List,clearPlayer2List} from '../Redux/actions'

import Board from '../board/Board'

import './Setup.css'

class Setup extends Component {
  state={
    map:'eight'
  }

  componentDidMount(){
    this.props.dispatch(fetchUnitData('http://localhost:3000/units'))
    this.props.dispatch(fetchBuildData('http://localhost:3000/armylists'))
  }

  handlePlayer1Build=(e)=>{
    let splitString=e.target.value.split(",")
    let parseArray=splitString.map((id)=>{
      return parseInt(id,10)
    })
    this.props.dispatch(clearPlayer1Army())
    this.props.dispatch(clearPlayer1List())
    parseArray.forEach((id)=>{
      let unitMatch=this.props.store.units.find((unit)=>{
        return unit.id===id
      })
      this.props.dispatch(addToPlayer1Army(unitMatch))
      this.props.dispatch(addToPlayer1List(unitMatch))
    })
  }

  handlePlayer2Build=(e)=>{
    let splitString=e.target.value.split(",")
    let parseArray=splitString.map((id)=>{
      return parseInt(id,10)
    })
    this.props.dispatch(clearPlayer2Army())
    this.props.dispatch(clearPlayer2List())
    parseArray.forEach((id)=>{
      let unitMatch=this.props.store.units.find((unit)=>{
        return unit.id===id
      })
      this.props.dispatch(addToPlayer2Army(unitMatch))
      this.props.dispatch(addToPlayer2List(unitMatch))
    })
  }

  handleClick=()=>{
    this.props.dispatch(setMap(this.state.map))
  }

  handleChange=(e)=>{
    this.setState({
      map:e.target.value
    })
  }

  render() {
    let renderPlayer1Builds=this.props.store.builds.map((build)=>{
      // console.log(build.unit_ids)
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
        <Link to='board' onClick={this.handleClick}>Start Game</Link><br/><br/>
      </div>
    )
  }
}

// <h3>Choose Map</h3>
// <input type="text" onChange={this.handleChange} autoComplete="off"/><br/><br/>

const mapStateToProps=state=>{
  return {
    store: state
  };
};

export default connect(mapStateToProps)(Setup);
