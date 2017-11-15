import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
logic:
1.if there's no user signed in, don't display
2. if there is a user signed in, display link button to dashboard and lot out button
3. log out removes token 

*/

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
