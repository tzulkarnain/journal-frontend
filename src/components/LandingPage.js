import React, { Component } from 'react';
import blueBeige from '../images/bluebeige.jpg';
import { Link } from 'react-router-dom';
import { Button, Header, Image } from 'semantic-ui-react'

// import styles from '../temp-css/landingPage.css'

/*
just need ot make sure that navbar doesnt display here... 
put image with content

*/
class LandingPage extends Component {
  
  render() {
    return (
      <div className="landingPage">
        <Image className="landingImg" src={blueBeige} alt="abstract-painting"/>
        <div className="landingTextWrapper">
          <Header as ='h1'>Welcome to Noctjournal</Header>
          <div>
          <Link to="/createaccount"><Button>Create Account</Button></Link>
          <Link to="/login"><Button>Log In</Button></Link>
          </div>
        </div>
      </div>
      
    )
  }
}

export default LandingPage;
