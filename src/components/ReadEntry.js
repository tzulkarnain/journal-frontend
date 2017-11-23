import React, { Component } from 'react';
import api from '../api.js'
import auth from '../auth.js';
import { Grid, Segment, Header,Button } from 'semantic-ui-react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import veryBad from '../images/verybad.png'


const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.3em;
  font-family: 'Sue Ellen Francisco', cursive;
  color: rgb(55, 85, 109);
  padding-bottom: 0.2em;
`;

const FontAwesome = require('react-fontawesome')

const CreateButton = styled(Button)`
&& {
background-color: #7e7c88;
color: rgb(246, 244, 244);
}
`;
const PageWrapper = styled.div`

`

const TitleWrapper = styled.div`
  padding: 1.4rem 0;
`

const ContentWrapper = styled.div`

`
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
          <PageWrapper>
            <img alt="unsplash-or-chosen" src={this.state.singleEntry.full_image_url} style={{ height: 35 + 'em' }} />
              <TitleWrapper>
                <Title>{this.state.singleEntry.title}</Title>
                <CreateButton size="massive" as={Link} to={`/dashboard/editentry/${this.state.singleEntry.id}`}>
                   <FontAwesome name="pencil"/> 
                   </CreateButton>
                <p>{this.displayDate(this.state.singleEntry.createdAt)}</p>
              </TitleWrapper>
             
              <ContentWrapper>
                <h5>Rating: {this.state.singleEntry.mood}</h5>
                <img src={veryBad}/>
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
              </ContentWrapper>

            </PageWrapper>
        }
      </div>
    );
  }
}

export default ReadEntry;
