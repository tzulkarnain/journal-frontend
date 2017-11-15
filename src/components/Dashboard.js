import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EntryPreview from './EntryPreview';
import NavBar from './NavBar'

/*
logic:
1. h1 needs to display the user's name by fetching that data from the database
2. p: would be cool of p used an api to cycle through quotes: https://codepen.io/catapixel/pen/LpVEgy / 
could also make our own api of quotes so they're relevant 
3. fairly certain the carosal type thing will be in Entry Preview not Dashboard. 
can experiment more when we have backend to populate
*/


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <NavBar />
        <div className="topWrapper">
          <h1>Hey Lily</h1>
          <p>Quote</p>
          <Link to="/writeentry"><button>+</button></Link>
        </div>
        <div className="entriesWrapper">
          <div className="entriesWrapperA">
            <h3>Your entries</h3>
          </div>
          <div className="entriesWrapperB">
            <EntryPreview />
          </div>
          <div className="entriesWrapperC">
            <EntryPreview />
          </div>
          <div className="entriesWrapperD">
            <div>next-arrow</div>
            <div>the past</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
