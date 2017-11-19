import React, { Component } from 'react';
import styled from 'styled-components';
import blueBeige from '../images/bluebeige.jpg';
import { Link } from 'react-router-dom';
import api from '../api.js'
import auth from '../auth.js';
import EntryPreview from './EntryPreview';

const Wrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    background: #616161;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  ${'' /* min-height: 100vh;
  width: 100%;
  background: black;
  color: #fff; */}
`;

const Sidebar = styled.div`
    flex: 1;
    color: white;
    width: 50px;
    height: 30px;
    float: left;
    align-items: stretch;
`
const Header = styled.div`
background-color: grey;
flex:1;
display: flex;
flex-direction: column;
`
const First = styled.div`
background-color: #FFF;
flex:1;
`;

const Second = styled.div`
flex: 1;
display: flex;
flex-direction: column;
`

const Box1 = styled.div`
background-color: blue;
flex:1;
`
const Box2 = styled.div`
background-color: black;
flex:1
`

const Title = styled.h1`
display: flex;
justify-content: center;
align-items: center;
font-size: 2.5em;
color: black;
`;


const Button = styled.button`
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 3px;
`;

const Div = styled.div`
  display:flex;
  grid-area: 5/ col4-start / last-line / 6
`;


export default class StyledTesting extends Component {
  constructor() {
    super();
    this.state = {
      userObj: {},
      entries: [],
      geoTaggedEntries:[]
    }
  }

  componentDidMount() {
    //requestEntries takes two arguments - the token, and the number of days to retrieve from.
    //"7" here indicates that we're retrieving entries made in the last 7 days.
    api.requestEntries(auth.getToken(),7)
      .then(reply => 
        this.setState({ entries: reply.body })
    );
    //same with requestGeotaggedEntries
    api.requestGeotaggedEntries(auth.getToken(),7)
    .then(reply => 
      this.setState({ geoTaggedEntries: reply.body })
  );
    const userObj = auth.getUser();
    console.log('userobj', userObj)
    this.setState({ userObj })

  }

  displayEntryPreviews = (entryObj) => {
    return (
      <div style={{display:'inline-block', margin: '2em 2em'}}><EntryPreview data={entryObj} key={entryObj.id} /></div>
    )
  }

  render() {
    return (

  
      <Wrapper>
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" id="mySidebar"><br/>    
<div class="w3-container">
<a href="#" onclick="w3_close()" class="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey" title="close menu">
  <i class="fa fa-remove"></i>
</a>
<h4><b>Menu</b></h4>
</div>
<div class="w3-bar-block">
<a href="#portfolio" onclick="w3_close()" class="w3-bar-item w3-button w3-padding w3-text-teal"><i class="fa fa-th-large fa-fw w3-margin-right"></i>DASHBOARD</a> 
<a href="#about" onclick="w3_close()" class="w3-bar-item w3-button w3-padding"><i class="fa fa-user fa-fw w3-margin-right"></i>GRAPHS</a> 
<a href="#contact" onclick="w3_close()" class="w3-bar-item w3-button w3-padding"><i class="fa fa-envelope fa-fw w3-margin-right"></i>MAPS</a>
</div>
</nav>
      

      
      
      <Sidebar>
      <div className="sidebar">
          <div><Link to="/dashboard">Dashboard</Link></div>
          <div><Link to="/dashboard">Map</Link></div>
          <div><Link to="/dashboard">Graphs</Link></div>
      </div>
      </Sidebar>

<Header>
<First> 

<p>Hello</p>

</First>
<Second>
<Box1>
testsadf
asdf
</Box1>

<Box2>
test2
</Box2>
</Second>

</Header>


      {/* <Div>
      	<Title>Welcome to Noctjournal {this.state.userObj.firstName}</Title>
        <div>
        <Link to="/createaccount"><Button >Create Account</Button></Link>
          <Link to="/login"><Button>Log In</Button></Link>
        </div>
        </Div> */}
      </Wrapper>
    )
  }
}
