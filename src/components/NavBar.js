import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/dashboard" className="navButton">Dashboard</Link>
        <button className="log-out">Log Out</button>
      </div>
    );
  }
}

export default NavBar;
