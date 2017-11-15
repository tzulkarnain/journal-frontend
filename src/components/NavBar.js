import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth.js';


/*
logic:
1.if there's no user signed in, don't display
2. if there is a user signed in, display link button to dashboard and lot out button
3. log out removes token 

*/

class NavBar extends Component {
  handleLogOut = (event) => {
    auth.logOut(auth.getToken())
    .then(() => { console.log('navbar this ', this)
     this.props.hist.push("/");
    }
    
    )
} 
  
  render() {
    return (
      <div className="navbar">
        <Link to="/dashboard" className="navButton">Dashboard</Link>
        <button onClick={this.handleLogOut} className="log-out">Log Out</button>
      </div>
    );
  }
}

export default NavBar;
