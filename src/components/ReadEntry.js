import React, { Component } from 'react';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth.js';
/*
Logic:
takes data from storage and displays it...
*/

class ReadEntry extends Component {
  constructor() {
    super();
    this.state = {
      singleEntry: {},
      loaded: false
    }
  }

  componentDidMount() {
    const userObj = auth.getUser();
    console.log('readEntry', this.props.match.params.id)
    api.requestSingleEntry(this.props.match.params.id)
      .then(reply => this.setState(
        {
          singleEntry: reply.body,
          loaded: true
        }
      ))
    // don't know what the 'id' property will be called yet

  }

  render() {
    return (
      <div>
        <NavBar />
        {!this.state.loaded ? <div>loading...</div> :

          <div className="content-wrapper">
            <img alt="unsplash-or-chosen" />
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
        }
      </div>
    );
  }
}

export default ReadEntry;
