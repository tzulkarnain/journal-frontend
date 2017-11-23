import React, { Component } from 'react';
import api from '../api.js'
import auth from '../auth.js';
import { Grid, Segment, Header,Button } from 'semantic-ui-react'


import nineTen from '../images/best.png'
import sevenEight from '../images/happy.png'
import fiveSix from '../images/ok.png'
import threeFour from '../images/bad.png'
import oneTwo from '../images/verybad.png'

import {Link} from 'react-router-dom'
import {Form,  Input } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';
import PickImage from './PickImage';
import firebase from 'firebase';
import styled from 'styled-components'
import questions from '../questions.js'


const FontAwesome = require('react-fontawesome')
const EmojiIcon = styled.img`
height: 3rem;
`
const config = {
    apiKey: 'AIzaSyDdAR2czNdvvLDrkr1MoSvz8wcGuKDj_0I',
    authDomain: 'curious-rose-noctjournal.firebaseapp.com',
    databaseURL: 'https://curious-rose-noctjournal.firebaseio.com',
    projectId: 'curious-rose-noctjournal',
    storageBucket: 'curious-rose-noctjournal.appspot.com',
    messagingSenderId: '34813210746'
  };
  firebase.initializeApp(config);
  
  const storage = firebase.storage();
  const storageRef = storage.ref('');

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.3em;
  font-family: 'Sue Ellen Francisco', cursive;
  color: #7e7c88;
  padding-bottom: 0.2em;
`;



const CreateButton = styled(Button)`
  && {
    background-color: #7e7c88;
    color: rgb(246, 244, 244);
    padding: 3px 9px;
    margin-top: 7%;
    }
`;
const PageWrapper = styled.div`
  width: 53.45rem;
  padding-bottom: 10%;
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
    flex-direction: column;
    display: flex;

`

const Question = styled.header`
  font-family: 'Roboto Slab';
  width: 90%;

`



class WriteEntryNew extends Component {
    constructor() {
        super();
        this.state = {
          //this might be better to initialise using "undefined" where I'm currently using "null"
          title: '',
          mood: 5,
          q1a1: '',
          q1a2: '',
          q1a3: '',
          q2: '',
          q3: '',
          q4: '',
          place: '',
          lat: null,
          lng: null,
          special_question:""
        };
      }

      componentDidMount(){
        this.setState({
          special_question:questions[14]
            // Math.floor(Math.random()*17)
        })
      }
      moodChange = e => {
        this.setState({ mood: e.target.value });
      };
      selectImage = photo => {
        this.setState({
          chosenPhoto: photo
        });
      };
      deleteChosenPhoto = () => {
        this.setState({
          chosenPhoto: null
        });
      };
      handleKeyPress = event => {
        //this checks if they pressed enter and prevents the default action(form submission) if they did
        if (event.which === 13) {
          event.preventDefault();
        }
      };
      handleSubmit = event => {
        event.preventDefault();
    
        console.log('submitting form.');
        let entryPhoto = this.state.chosenPhoto;
        let entryDataObj = {
          title: this.state.title,
          mood: this.state.mood,
          q1a1: this.state.q1a1,
          q1a2: this.state.q1a2,
          q1a3: this.state.q1a3,
          q2: this.state.q2,
          q3: this.state.q3,
          q4: this.state.q4,
          special_question:this.state.special_question,
          place:this.state.place
        };
        //this whole function prepares the entry.
        //p1 sets the lat and lng according to the user-entered address
        const p1 = api.requestLatLong(this.state.place).then(object => {
          entryDataObj.lat = object.lat;
          entryDataObj.lng = object.lng;
        });
    
        //p2 will check if the user chose an image from their own hard drive, and if so,
        //will upload it to firebase for us.
        const p2 = entryPhoto.userUploaded
          ? (console.log(
              'User chose to upload photo. Uploadng to Firebase:',
              entryPhoto
            ),
            this.setState({ loadingWrite: true }),
            storageRef
              .child(
                `user_uploaded_photos/${auth.getUser().user_id}/${
                  this.state.title
                }/${entryPhoto.name}`
              )
              .put(entryPhoto)
              .then(snapshot => {
                entryDataObj.full_image_url = snapshot.downloadURL;
                entryDataObj.thumbnail_image_url = snapshot.downloadURL;
              }))
          : //but if the entryPhoto is not userUploaded, it's an unSplash object
            //with unsplash.com URLs in it, so we'll use those
            (console.log(
              'user chose an unSplash image, image urls are:',
              entryPhoto.urls
            ),
            (entryDataObj.full_image_url = entryPhoto.urls.regular),
            (entryDataObj.thumbnail_image_url = entryPhoto.urls.thumb));
    
        Promise.all([p1, p2])
          .then(() => {
            console.log('creating an entry with obj:', entryDataObj);
            api
              .createSingleEntry(entryDataObj, auth.getToken())
              .then(results => console.log(results));
          })
          .then(() => this.props.reloadEntries())
          .then(() => this.props.history.push('/dashboard'));
      };
      setMoodDescription = (rating) => {
          let entryMood =
          rating >= 9 ? `${nineTen}`:
            rating >= 7 ? `${sevenEight}`:
              rating >= 5 ? `${fiveSix}` :
                rating >= 3 ? `${threeFour}` :
                  rating >= 0 ? `${oneTwo}`: "Another day";
        return entryMood;
      }
  render() {
    return (
      <div style={{display: 'flex', 'align-content': 'center', 'justify-content': 'center'}} >    
        {/* {!this.state.loaded ? <div>loading...</div> : */}
          <PageWrapper>

          <PickImage
              mood={this.state.mood}
              chosenPhoto={this.state.chosenPhoto}
              selectImage={this.selectImage}
              deleteChosenPhoto={this.deleteChosenPhoto}
            />
            <TitleWrapper>
              <Title>Write a new entry</Title>
            </TitleWrapper>
             {/* 1 */}
             <form>
             <MainContent>
             <ContentWrapper>
              <QuestionWrapper>
                <Question>Title</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </AnswerWrapper>
              </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
                <Question>Rate your mood from 1-10</Question>
              </QuestionWrapper>
              <AnswerWrapper style={{'text-align':'center'}} >
              <p><EmojiIcon src={this.setMoodDescription(this.state.mood)}/></p>
              <input
                type="range"
                min="1"
                max="10"
                value={this.state.mood}
                onChange={this.moodChange}
              />              
              <p>{this.state.mood}</p>
              </AnswerWrapper>
            </ContentWrapper>
          {/* 2 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>What were the highlights of your day?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  type="text"
                  value={this.state.q1a1}
                  onChange={e => this.setState({ q1a1: e.target.value })}
                />
                <Input
                  type="text"
                  value={this.state.q1a2}
                  onChange={e => this.setState({ q1a2: e.target.value })}
                />
                <Input
                  type="text"
                  value={this.state.q1a3}
                  onChange={e => this.setState({ q1a3: e.target.value })}
                />
              </AnswerWrapper>
            </ContentWrapper>
            {/* //3 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>What could you have done to make today better?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  type="text"
                  value={this.state.q2}
                  onChange={e => this.setState({ q2: e.target.value })}
                />
              </AnswerWrapper>
            </ContentWrapper>
            {/* //4 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>{this.state.special_question}</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  type="text"
                  value={this.state.q3}
                  onChange={e => this.setState({ q3: e.target.value })}
                />
              </AnswerWrapper>
            </ContentWrapper>
            {/* //5 */}
            <ContentWrapper>
              <QuestionWrapper>
              <Question>notes</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Input
                  type="text"
                  value={this.state.q4}
                  onChange={e => this.setState({ q4: e.target.value })}
                />
              </AnswerWrapper>
            </ContentWrapper>
            <ContentWrapper>
              <QuestionWrapper>
              <Question>Where did you go today?</Question>
              </QuestionWrapper>
              <AnswerWrapper>
              <Autocomplete
                  style={{ width: '90%' }}
                  onPlaceSelected={place => {
                    this.setState({ place: place.formatted_address });
                    console.log(
                      'we formatted the user submitted address to:',
                      place.formatted_address
                    );
                  }}
                  types={[]}
                  componentRestrictions={{}}
                />
              </AnswerWrapper>
            </ContentWrapper>

            <Button onClick={this.handleSubmit}>
            {this.state.loadingWrite ? 'Uploading...' : 'Submit'}
          </Button>
              
             </MainContent>
             
             </form>
            

          </PageWrapper>

            
        {/* } */}
      </div>
    )
  }
}

export default WriteEntryNew;
