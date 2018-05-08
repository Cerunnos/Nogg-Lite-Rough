import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import ListArmylists from './ListArmylists'

import './ListArmylistsContainer.css'

class ListArmylistsContainer extends Component {
    render() {
    return(
      <div className="ListArmylistsContainer">
        <ListArmylists/>
      </div>
    )
  }
}

export default ListArmylistsContainer
