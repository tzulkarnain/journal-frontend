import React, { Component } from 'react';
import api from '../api.js';
import auth from '../auth';
import { Header, Button, Form, Grid, Input } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';
import PickImage from './PickImage';
import firebase from 'firebase';
import nineTen from '../images/best.png'
import sevenEight from '../images/happy.png'
import fiveSix from '../images/ok.png'
import threeFour from '../images/bad.png'
import oneTwo from '../images/verybad.png'
import styled from 'styled-components'
import questions from '../questions.js'

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
/*
Logic:

Stretch goal: rotate through different questions depending on day / random / mood
(shouldn't be too hard tbh)

gather data and put it into json and then api sends it to server OMG
*/

const EmojiIcon = styled.img`
height: 5rem;
`


class WriteEntry extends Component {
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
      special_question:questions[Math.floor(Math.random()*17)]
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
      special_question:this.state.special_question
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
    console.log('this.props.history', this.props.history);
    return (
      <div className="write-entry">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 700 }}>
            <PickImage
              mood={this.state.mood}
              chosenPhoto={this.state.chosenPhoto}
              selectImage={this.selectImage}
              deleteChosenPhoto={this.deleteChosenPhoto}
            />
            <Header as="h2" textAlign="center">
              Write a new entry
            </Header>
            <Form size="big" widths="equal" onKeyPress={this.handleKeyPress}>
              <Form.Field>
                <label>Give today a title</label>
                <Input
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Rate your mood from 1-10</label>
                {/* <p><img src={this.setMoodDescription(this.state.mood)} style={{height: '3.8rem', 'padding-bottom': '1rem'}} /></p> */}
                <p><EmojiIcon src={this.setMoodDescription(this.state.mood)}/></p>
                <Input
                  type="range"
                  min="1"
                  max="10"
                  value={this.state.mood}
                  onChange={this.moodChange}
                />
                <p>{this.state.mood}</p>
              </Form.Field>
              <Form.Field>
                <label>What are three highlights of today?</label>
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
              </Form.Field>
              <Form.Field>
                <label>What could you have done to make today better?</label>
                <Input
                  type="text"
                  value={this.state.q2}
                  onChange={e => this.setState({ q2: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>{this.state.special_question}</label>
                <Input
                  type="text"
                  value={this.state.q3}
                  onChange={e => this.setState({ q3: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Notes</label>
                <Input
                  type="text"
                  value={this.state.q4}
                  onChange={e => this.setState({ q4: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Where did you go today?</label>
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

                {/* <Input type='text' value={this.state.place} onChange={(e) => this.setState({ place: e.target.value })} /> */}
              </Form.Field>
              <Button onClick={this.handleSubmit}>
                {this.state.loadingWrite ? 'Uploading...' : 'Submit'}
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default WriteEntry;
