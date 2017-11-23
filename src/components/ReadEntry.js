import React, { Component } from 'react';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth.js';
import { Grid, Segment, Header,Button } from 'semantic-ui-react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'


const FontAwesome = require('react-fontawesome')

const CreateButton = styled(Button)`
&& {
background-color: #7e7c88;
color: rgb(246, 244, 244);
}
`;

class ReadEntry extends Component {
  constructor() {
    super();
    this.state = {
      singleEntry: {},
      loaded: false
    }
  }

  componentDidMount() {
    console.log('readEntry', this.props.match.params.id)
    api.requestSingleEntry(this.props.match.params.id, auth.getToken())
      .then(reply => {
        console.log(reply.body)
        this.setState(

          {
            singleEntry: reply.body,
            loaded: true
          }
        )
      })

  }

  displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
  }

  render() {
    return (
      <div>
        {!this.state.loaded ? <div>loading...</div> :
          <Grid columns="equal" padded>
          <Grid.Column>
              <Grid.Row>
                <img alt="unsplash-or-chosen" src={this.state.singleEntry.full_image_url} style= {{height: 35 + 'em'}}/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Row>
              <Grid.Column>
                <div>
                  <Header as="h1">{this.state.singleEntry.title}</Header>
                  BUTTON HERE
                  <CreateButton size="massive" as={Link} to={`/dashboard/editentry/${this.state.singleEntry.id}`}>
                   <FontAwesome name="pencil"/> 
                   </CreateButton>

                  
                  </div>
                
                <p>{this.displayDate(this.state.singleEntry.createdAt)}</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <h5>Rating: {this.state.singleEntry.mood}</h5>
                  <h5>Highlights: </h5>
                  <div>{this.state.singleEntry.q1a1}</div>
                  <div>{this.state.singleEntry.q1a2}</div>
                  <div>{this.state.singleEntry.q1a3}</div>
                  <h5>Could have done better:</h5>
                  <p>{this.state.singleEntry.q2}</p>
                  <h5>Always wanted to:</h5>
                  <p>{this.state.singleEntry.q3}</p>
                  <h5>Today's notes</h5>
                  <p>{this.state.singleEntry.q4}</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
      </div>
    );
  }
}

export default ReadEntry;
