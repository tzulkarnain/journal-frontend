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
    api.requestSingleEntry(this.props.match.params.id, auth.getToken())
      .then(reply => {console.log(reply.body)
        this.setState(

        {
          singleEntry: reply.body,
          loaded: true
        }
        )})
    // don't know what the 'id' property will be called yet
  }

  render() {
    return (
      <div>
        <NavBar />
        {!this.state.loaded ? <div>loading...</div> :

          <div className="content-wrapper">
            <img alt="unsplash-or-chosen" />
            <h3>Title{this.state.singleEntry.title}</h3>
            <h4>Date</h4>
            <div className="content">
              <h5>Rating: {this.state.singleEntry.mood}</h5>
              <h5>Highlights: </h5>
              <ul>
                <li>{this.state.singleEntry.q1a1}</li>
                <li>{this.state.singleEntry.q1a2}</li>
                <li>{this.state.singleEntry.q1a3}</li>
              </ul>
              <h5>Could have done better:</h5>
              <p>{this.state.singleEntry.q2}</p>
              <h5>Always wanted to:</h5>
              <p>{this.state.singleEntry.q3}</p>
              <h5>Today's notes</h5>
              <p>{this.state.singleEntry.q4}</p>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ReadEntry;
