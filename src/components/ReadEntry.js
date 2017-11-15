import React, { Component } from 'react';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth.js';
/*
Logic:
takes data from storage and displays it...
*/

class ReadEntry extends Component {
  componentDidMount() {
    const userObj = auth.getUser();
    api.requestSingleEntry(userObj.id)
    // don't know what the 'id' property will be called yet

  }

  render() {
    return (
      <div>
        <NavBar />
        <img alt="unsplash-or-chosen"/>
        <div className="content-wrapper">
          <h3>Title</h3>
          <h4>Date</h4>
          <div className="content">
            <h5>Rating:number or icon</h5>
            <h5>Highlights:</h5>
            <ul>
              <li>first highlight</li>
              <li>second highlight</li>
              <li>third highlight</li>
            </ul>
            <h5>Could have done better:</h5>
            <p>I could have...</p>
            <h5>Always wanted to:</h5>
            <p>I've always wanted to...</p>
            <h5>Today's notes</h5>
            <p>Today I...</p>
          </div>
        </div>

      </div>
    );
  }
}

export default ReadEntry;
