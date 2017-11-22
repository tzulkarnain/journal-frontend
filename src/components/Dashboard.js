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
import { Header, Input,Button } from 'semantic-ui-react'
import ReadEntry from './ReadEntry';

// import { Grid, Button } from 'react-bootstrap';

const MainWrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: 15% 60%;

`

const SideBarChoices = styled.div`
  display: grid;
  grid-row-gap: 2em;
  position: relative;
  width: 100%;
  padding-top: 1em;

`
const ContentWrapper = styled.div`
left: 15%;
position: absolute; 
width: 75%; 
height: 100%; 
display: grid;
`

// const ContentWrapper = styled.div`
//   display: grid;
// `
const Options = styled.span`
  padding: 2em;
  color: black;
  display: inline-block;
  &:hover {          display: inline-block;
  }
`

const SidebarLink = styled.div`
  &:hover {
    background: lightblue;
    transform: scale(1.2);
}

`
const ResultsHeader = props => {
  let currentPeriod =
    props.currentPeriod === 1 ? "day" :
      props.currentPeriod === 7 ? "week" :
        props.currentPeriod === 10 ? "10 days" :
          props.currentPeriod === 30 ? 'month' :
            props.currentPeriod === 90 ? "3 months" :
              props.currentPeriod === 180 ? "6 months" :
                props.currentPeriod === 365 ? "year" :
                    null
                    
  let currentSearch = 
    props.currentSearchTerm? props.currentSearchTerm:null

  let periodText = currentPeriod ? `Showing entries from the past ${currentPeriod}` : null
  let searchText = currentSearch ? `Showing entries matching "${currentSearch}"` : null
  let periodAndSearchText = currentPeriod && currentSearch? `Showing entries matching "${currentSearch}" in the past ${currentPeriod}` : null
  let genericText = `Showing all entries`
  // console.log("ResultsHeader reloaded. periodText is",periodText,"searchText is",searchText,"PeriodAndSearchText is ",periodAndSearchText)
  return <Header>{
    periodAndSearchText? periodAndSearchText :
      periodText ? periodText :
        searchText ? searchText :
          genericText}<Button onClick={props.searchReset}>reset</Button>
  </Header>
}
// 

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
      //searchPeriod is the period we are going to search for, next time we click the "search" button.
      //"currentPeriod" is the period that is currently displayed ("currently showing results from the past X days")
      searchPeriod: "",
      currentPeriod: 7,
      searchTerm: "",
      currentSearchTerm: "",
      moodLimit: ""
    }
  }


  componentDidMount() {
    //requestEntries takes arguments - the token, number of days to retrieve from, the search term and a mood limit.
    //populates this.state.geotaggedEntries by filtering for entries with a lat property.

    this.loadEntries();
    const userObj = auth.getUser();
    console.log('userobj', userObj)
    this.setState({ userObj })

  }

  loadEntries = () => {
    api.requestEntries(auth.getToken(), this.state.searchPeriod, this.state.searchTerm, this.state.moodLimit)
      .then(reply =>
        this.setState({
          entries: reply.body,
          geotaggedEntries: reply.body.filter(entry => !!entry.lat),
          currentPeriod: this.state.searchPeriod,
          currentSearchTerm:this.state.searchTerm
        }, ()=>console.log("loadEntries here. since we're dispaying new results, changed currentPeriod to", this.state.currentPeriod))
      );
  }

  handleClick = () => {
   this.loadEntries()
    //consider adding previous function here

  }
  searchReset=()=>{
    this.setState({
      searchPeriod:"",
      searchTerm:""
    },this.loadEntries)
  }


  render() {

    return (

      <div className="dashboard">
        <NavBar hist={this.props.history}

          updateSearchTerm={(searchTerm) => (this.setState({ searchTerm }))}

          updatePeriod={
            (searchPeriod) => (this.setState({ searchPeriod }))}

          searchTermValue={this.state.searchTerm}
          periodValue={this.state.searchPeriod}
          handleClick={this.handleClick}
        />

        <MainWrapper>
          <div className="side-bar-wrapper" style={{ 'position': 'fixed', 'width': 15 + '%' }}>
            <SideBarChoices>
            <Link to="/dashboard" style={{ 'textDecoration': 'none' }}>
              <SidebarLink><Options>Entries</Options></SidebarLink></Link>
            <Link to="/dashboard/stats" style={{ 'textDecoration': 'none' }}>
              <SidebarLink><Options>Stats</Options></SidebarLink></Link>
            <Link to="/dashboard/map" style={{ 'textDecoration': 'none' }}>
              <SidebarLink><Options>Map</Options></SidebarLink></Link>
            </SideBarChoices>
          </div>

          <ContentWrapper>
            {/* display: grid; probably unnecessary */}
            <ResultsHeader 
            currentSearchTerm={this.state.currentSearchTerm} 
            currentPeriod={this.state.currentPeriod}
            searchReset={this.searchReset}></ResultsHeader>
            <Route exact path={`/dashboard`} render={() => { return <DisplayEntries entries={this.state.entries} /> }} />
            <Route path={`/dashboard/entries`} render={() => { return <DisplayEntries entries={this.state.entries} /> }} />
            <Route path={`/dashboard/stats`} render={() => { return <SimpleChart hist={this.props.history} entries={this.state.entries.slice().reverse()} /> }} />
            <Route path={`/dashboard/map`} render={() => { return <SimpleMap geotaggedEntries={this.state.geotaggedEntries} /> }} />
            <Route path={`/dashboard/writeentry`} render={() => { return <WriteEntry history={this.props.history} reloadEntries={this.loadEntries} /> }} />
            <Route path={`/dashboard/readentry/:id`} render={(props) => { return <ReadEntry {...props} history={this.props.history} /> }} />
          </ContentWrapper>
        </MainWrapper>

      </div>
    );
  }
}

export default Dashboard;
