import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import DisplayEntries from './DisplayEntries';
import NavBar from './NavBar'
import SimpleMap from './SimpleMap';
import api from '../api.js'
import auth from '../auth.js';
import SimpleChart from './SimpleChart'
import WriteEntry from './WriteEntry';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react'

// import { Grid, Button } from 'react-bootstrap';

const MainWrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: 20% 60%;

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
const SearchInput = styled.input`
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
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
      geotaggedEntries: [{ lat: 45.50, lng: -73.56 }
      ],
      period: 7,
      searchTerm: null,
      moodLimit: null
    }
  }

  componentDidMount() {
    //requestEntries takes two arguments - the token, and the number of days to retrieve from.
    //"7" here indicates that we're retrieving entries made in the last 7 days.
    api.requestEntries(auth.getToken(), this.state.period, this.state.searchTerm, this.state.moodLimit)
      .then(reply =>
        this.setState({ entries: reply.body })
      );
    //same with requestGeotaggedEntries
    api.requestGeotaggedEntries(auth.getToken(), this.state.period, this.state.searchTerm, this.state.moodLimit)
      .then(reply =>
        this.setState({ geotaggedEntries: reply.body })
      );
    const userObj = auth.getUser();
    console.log('userobj', userObj)
    this.setState({ userObj })

  }

  handleClick = (event) => {
    api.requestEntries(auth.getToken(), this.state.period, this.state.searchTerm, this.state.moodLimit)
      .then(reply =>
        this.setState({ entries: reply.body })
      );
    //same with requestGeotaggedEntries
    api.requestGeotaggedEntries(auth.getToken(), this.state.period, this.state.searchTerm, this.state.moodLimit)
      .then(reply =>
        this.setState({ geotaggedEntries: reply.body })
      );
  }



  render() {
    console.log('the state: ', this.state)

    return (

      <div className="dashboard">
        <NavBar hist={this.props.history} updateSearchTerm = {(searchTerm) => (this.setState({ searchTerm }))} 
        updatePeriod = {(period) => (this.setState({ period }))} searchTermValue = {this.state.searchTerm} periodValue = {this.state.period}
        handleClick={this.handleClick} 
        />

        <MainWrapper>
          <div className="side-bar-wrapper" style={{ 'position': 'fixed', 'width': 20 + '%' }} >
            <SideBarChoices>
              <Link to="/dashboard/entries" style={{ 'text-decoration': 'none' }} ><Options>Entries</Options></Link>
              <Options>Favourites</Options>
              <Link to="/dashboard/stats" style={{ 'text-decoration': 'none' }} ><Options>Stats</Options></Link>
              <Link to="/dashboard/map" style={{ 'text-decoration': 'none' }} ><Options>Map</Options></Link>
              <hr/>

            </SideBarChoices>
          </div>
          <div className="content-wrapper" style={{ 'left': 20 + '%', 'position': 'absolute', 'width': '75%', 'height': '100%', 'display': 'grid' }} >
            {/* display: grid; probably unnecessary */}
            <Route path={`/dashboard/entries`} render={() => { return <DisplayEntries entries={this.state.entries} /> }} />
            <Route path={`/dashboard/stats`} render={() => { return <SimpleChart hist={this.props.history} entries={this.state.entries.slice().reverse()} period={this.state.period} /> }} />
            <Route path={`/dashboard/map`} render={() => { return <SimpleMap geotaggedEntries={this.state.geotaggedEntries} /> }} />
            <Route path={`/dashboard/writeentry`} render={() => { return <WriteEntry history={this.props.history} /> }} />
          </div>
        </MainWrapper>

      </div>
    );
  }
}

export default Dashboard;
