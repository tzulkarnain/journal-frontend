import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import DisplayEntries from './DisplayEntries';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth.js';
import { Grid, Segment, Button } from 'semantic-ui-react'
import styled from 'styled-components';
// import { Grid, Button } from 'react-bootstrap';

const MainWrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: 25% 60%;

`

const SideBarChoices = styled.div`
  display: grid;
  ${'' /* grid-row-gap: 2em; */}
  position: relative;
  width: 100%;
  padding-top: 1em;

`

const ContentWrapper = styled.div`
  display: grid;
`
const Options = styled.div`
  padding: 2em;
  color: black;
  &:hover {
      font-size: 1.5em;
    }

`

/*
logic:
1. p: would be cool of p used an api to cycle through quotes: https://codepen.io/catapixel/pen/LpVEgy / 
could also make our own api of quotes so they're relevant 
2. fairly certain the carosal type thing will be in Entry Preview not Dashboard. 
can experiment more when we have backend to populate

todo: state only has contents that user put into create account
todo: remove history props from nav bar

fix dashboard if logged out situation!!! 
on component did mount or render or will mount to check if user is logged in and reroutes
{this.state.userObj.firstName}
*/


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userObj: {},
      entries: [],
      geoTaggedEntries: []
    }
  }

  componentDidMount() {
    //requestEntries takes two arguments - the token, and the number of days to retrieve from.
    //"7" here indicates that we're retrieving entries made in the last 7 days.
    api.requestEntries(auth.getToken(), 7)
      .then(reply =>
        this.setState({ entries: reply.body })
      );
    //same with requestGeotaggedEntries
    api.requestGeotaggedEntries(auth.getToken(), 7)
      .then(reply =>
        this.setState({ geoTaggedEntries: reply.body })
      );
    const userObj = auth.getUser();
    console.log('userobj', userObj)
    this.setState({ userObj })

  }



  render() {
    console.log('the state: ', this.state)

    return (

      <div className="dashboard">
        <NavBar hist={this.props.history} />
          <MainWrapper>
            <div className="side-bar-wrapper" style={{'position': 'fixed', 'width': 25 + '%' }} >
              <SideBarChoices>      
               <Link to="/writeentry" style= {{'text-decoration': 'none'}} ><Options>Entries</Options></Link> 
                <Options>Favourites</Options>
                <Options>Stats</Options>
                <Options>Map</Options>
              </SideBarChoices>
            </div>
            <div className="content-wrapper" style={{'left': 20 + '%', 'position': 'relative'}} >
            {/* display: grid; probably unnecessary */}
              <DisplayEntries entries={this.state.entries} />
            </div>
          </MainWrapper>

      </div>
    );
  }
}

export default Dashboard;
