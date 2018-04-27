import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchBuildData,addBuilds,fetchUnitData} from '../Redux/actions'

import './ListArmylists.css'
import Armylist from './Armylist'

class ListArmylists extends Component {
  componentDidMount(){
    this.props.dispatch(fetchUnitData('http://localhost:3000/units'))
    this.props.dispatch(fetchBuildData('http://localhost:3000/armylists'))
  }
  render() {
    console.log(this.props.store)
    let renderAllBuilds=this.props.store.builds.map((build)=>{
      return <Armylist build={build}/>
    })
    return(
      <div className="listarmylists">
      <h1>Builds</h1>
        {renderAllBuilds}
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return {
    store: state
  };
};
export default connect(mapStateToProps)(ListArmylists);
