import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <NavBar />
        <div className="topWrapper">
          <span>Hey Lily</span>
          <span>Quote</span>
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
            <span>next-arrow</span>
            <span>the past</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
