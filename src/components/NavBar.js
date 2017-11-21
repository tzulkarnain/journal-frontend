import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import auth from '../auth.js';
import { Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
const FontAwesome = require('react-fontawesome')

const SearchInput = styled.input`
  width: 500px;
  height: 40px;
  padding: 0 30px 2px 42px;
  font-size: 14px;
  color: #111;
  background-color: #f1f1f1;
  border: 1px solid transparent;
  border-radius: 20px;
  outline: none;
  transition: all .2s ease-in-out;
    -webkit-appearance: none;
`



/*
logic:
1.if there's no user signed in, don't display
2. if there is a user signed in, display link button to dashboard and lot out button
3. log out removes token 

*/

class NavBar extends Component {

  handleLogOut = (event) => {
    auth.logOut(auth.getToken())
      .then(() => {
        console.log('navbar this ', this)
        this.props.hist.push("/");
      }

      )
  }
  handleSubmit = (event)=>{
    event.preventDefault();
    this.props.handleClick()
  }
  handleRedirectToDashboard = (event) => {
    this.props.hist.push("/dashboard")
  }

  render() {
    return (
      <Menu stackable position="right">
      <Menu.Item>
       <Icon name='moon' size="big"/>
        </Menu.Item>
        <div className='searchBar'>
        <form onSubmit={this.handleSubmit}>
            <Icon name="search" size="large"/>
                <SearchInput className="inputKeyword" 
                type='text' value={this.props.searchTermValue } 
                placeholder="Search word" 
                onChange={(event)=>(this.props.updateSearchTerm(event.target.value))} />
                
                <span>in the last</span>
                
                <select
                ref={r=>this.periodSelector=r} 
                name="days"
                onChange={(event)=>(
                  //if the user selects "all time" in the dropdown here,
                  //the value is set to empty quotation marks ("").
                  //if that's so, onChange will update dashboard's state
                  //to reflect that. otherwise it will turn the value (which must be set as a string)
                  //into an integer and update Dashboard's state with that integer.
                  this.props.updatePeriod(event.target.value!==""?parseInt(event.target.value):event.target.value))} 
                value={this.props.periodValue}>
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="10">10 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                    <option value="">all time</option>
                  </select>
                <button>Search</button>
              </form>
        </div>
        <Menu.Menu position="right">
        <Menu.Item
          name='dashboard'
          onClick={this.handleRedirectToDashboard} 
        >
          Dashboard
      </Menu.Item>
        <Menu.Item
          name='logOut'
          onClick={this.handleLogOut}
        >
          Log out
      </Menu.Item>
        </Menu.Menu>
       
      </Menu>
      // {/* <div className="navbar">
      //   <Link to="/dashboard" className="navButton">Dashboard</Link>
      //   <button onClick={this.handleLogOut} className="log-out">Log Out</button>
      // </div> */}
    );
  }
}

export default NavBar;
