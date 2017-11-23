import React, { Component } from 'react';
import api from '../api.js'
import auth from '../auth.js';
import { Grid, Segment, Header } from 'semantic-ui-react'
import styled from 'styled-components';
import nineTen from '../images/best.png'
import sevenEight from '../images/happy.png'
import fiveSix from '../images/ok.png'
import threeFour from '../images/bad.png'
import oneTwo from '../images/verybad.png'

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.3em;
  font-family: 'Sue Ellen Francisco', cursive;
  color: #7e7c88;
  padding-bottom: 0.2em;
`;

const PageWrapper = styled.div`
  width: 53.45rem;
  padding-bottom: 20%;
`

const TitleWrapper = styled.div`
  padding: 1.4rem 0;
`

const MainContent = styled.div`
  width: 53.45rem;
  

`

const ContentWrapper = styled.div`
     max-width: 940px;
     margin: 1rem auto 0 0;
     display: grid;
     grid-template-columns: 1fr 1fr;
     grid-gap: 10px;
`

const QuestionWrapper = styled.div`
  padding-top: 1.5rem;
  text-align: right;
`


const AnswerWrapper = styled.div`
  text-align: left;
  border-top: 1px solid lightgrey;
  padding: 1rem;

`

const Question = styled.header`
  font-family: 'Roboto Slab';
  width: 90%;

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

  setMoodDescription = (rating) => {
    let emoji;
    switch (rating) {
      case 10:
      case 9:
        emoji = `${nineTen}`;
        break;
      case 8:
      case 7:
        emoji = `${sevenEight}`;
        break;
      case 6:
      case 5:
        emoji = `${fiveSix}`;
        break;
      case 4:
      case 3:
        emoji = `${threeFour}`;
        break;
      case 2:
      case 1:
        emoji = `${oneTwo}`;
        break;
      default:
        emoji = `${sevenEight}`

        return emoji
    }
    return emoji
  }

  render() {
    return (
      <div style={{display: 'flex', 'align-content': 'center', 'justify-content': 'center'}} >    
        {!this.state.loaded ? <div>loading...</div> :
          <PageWrapper>
            <img alt="unsplash-or-chosen" src={this.state.singleEntry.full_image_url} style={{ width: '53.45rem' }} />
            <TitleWrapper>
              <Title>{this.state.singleEntry.title}</Title>
              <p>{this.displayDate(this.state.singleEntry.createdAt)}</p>
            </TitleWrapper>
             {/* 1 */}
             <MainContent>
            <ContentWrapper>
              <QuestionWrapper>
                <Question>mood</Question>
              </QuestionWrapper>
              <AnswerWrapper>
                <img src={this.setMoodDescription(this.state.singleEntry.mood)} style={{height:'2rem' }} />
              </AnswerWrapper>
            </ContentWrapper>
          {/* 2 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>highlights </Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleEntry.q1a1}</p>
                <p>{this.state.singleEntry.q1a2}</p>
                <p>{this.state.singleEntry.q1a3}</p>
              </AnswerWrapper>
            </ContentWrapper>
            {/* //3 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>could have done better</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleEntry.q2}</p>
              </AnswerWrapper>
            </ContentWrapper>
            {/* //4 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>always wanted to</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleEntry.q3}</p>
              </AnswerWrapper>
            </ContentWrapper>
            {/* //5 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>notes</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleEntry.q4}</p>
              </AnswerWrapper>
            </ContentWrapper>
            {/* <ContentWrapper>
              <QuestionWrapper>
              <Question>visted</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <p>{this.state.singleEntry.place}</p>
              </AnswerWrapper>
            </ContentWrapper> */}
            
             </MainContent>

          </PageWrapper>
        }
      </div>
    );
  }
}

export default ReadEntry;
