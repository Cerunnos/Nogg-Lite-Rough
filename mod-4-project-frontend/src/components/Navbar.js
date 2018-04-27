import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import CreateUnit from './CreateUnit'
import './Navbar.css'

class Navbar extends Component {
    render() {
    return(
      <ul className="navbar">
        <li><Link to="/">Menu</Link></li>
        <br/>
      </ul>
    )
  }
}

export default Navbar
