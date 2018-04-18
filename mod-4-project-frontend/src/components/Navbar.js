import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'
import CreateUnit from './CreateUnit'
import './Navbar.css'

class Navbar extends Component {
    render() {
    return(
      <ul className="navbar">
        <li><Link to="/">Armies</Link></li>
        <li><Link to="/createUnit">Create Unit</Link></li>
        <li><Link to="/board">Board</Link></li>
        <br/>
      </ul>
    )
  }
}

export default Navbar
