import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import Menu from './Menu'

import './MenuContainer.css'

class MenuContainer extends Component {
    render() {
    return(
      <div className="menuContainer">
        <Menu/>
      </div>
    )
  }
}

export default MenuContainer
