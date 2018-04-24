import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import CreateUnit from './CreateUnit'
import './Navbar.css'

class Navbar extends Component {
    render() {
    return(
      <ul className="navbar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/armies">Armies</Link></li>
        <li><Link to="/createUnit">Create Unit</Link></li>
        <li><Link to="/board">Board</Link></li>
        <br/>
      </ul>
    )
  }
}

export default Navbar
