import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import './Menu.css'

class Menu extends Component {
    render() {
    return(
      <div className="menu">
        <h1 className="menuTitle">*Name Goes Here*</h1>
        <div className="menuContent">
          <div className="menuItem">
            <Link to='/setup'>Start Game</Link>
          </div><br/>
          <div className="menuItem">
            <Link to='/armies'>Army Builder</Link>
          </div><br/>
          <div className="menuItem">
            <Link to='/armylists'>View Builds</Link>
          </div><br/>
          <div className="menuItem">
            <Link to='/createUnit'>Create a Unit</Link>
          </div><br/>
          <h4 className="menuItem">View Armylists(Currently can only delete)</h4>
          <h4 className="menuItem">The Grand Coven(Lore and Stuff)</h4>
          <h4 className="menuItem">The Unseen College(Lore and Stuff)</h4>
          <h4 className="menuItem">The Jormungandr Corp.(Lore and Stuff)</h4>
        </div>
      </div>
    )
  }
}

export default Menu
