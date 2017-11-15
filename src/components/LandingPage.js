import React, { Component } from 'react';
import blueBeige from '../images/bluebeige.jpg';
import { Link } from 'react-router-dom';
import styles from '../temp-css/landingPage.css'

/*
just need ot make sure that navbar doesnt display here... 

*/
class LandingPage extends Component {
  
  render() {
    return (
      <div className="landingPage">
        <img className="landingImg" src={blueBeige} alt="abstract-painting"/>
        <div className="landingTextWrapper">
          <h1>Welcome to Noctjournal</h1>
          <div>
          <Link to="/createaccount"><button>Create Account</button></Link>
          <Link to="/login"><button>Log In</button></Link>
          </div>
        </div>
      </div>
      
    )
  }
}

export default LandingPage;
