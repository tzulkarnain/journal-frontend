import React, { Component } from 'react';
import api from '../api.js'
import auth from '../auth'
import { Header, Button, Form, Grid, Input } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete';
import PickImage from "./PickImage"
import firebase from 'firebase'



const config = {
    apiKey: "AIzaSyDdAR2czNdvvLDrkr1MoSvz8wcGuKDj_0I",
    authDomain: "curious-rose-noctjournal.firebaseapp.com",
    databaseURL: "https://curious-rose-noctjournal.firebaseio.com",
    projectId: "curious-rose-noctjournal",
    storageBucket: "curious-rose-noctjournal.appspot.com",
    messagingSenderId: "34813210746"
};
// firebase.initializeApp(config);

const storage = firebase.storage()
const storageRef = storage.ref("")


class EditEntry extends Component {
    constructor() {
        super()
        this.state = {
            title: "",
            mood: "",
            q1a1: "",
            q1a2: "",
            q1a3: "",
            q2: "",
            q3: "",
            q4: "",
            lat: "",
            lng: "",
            chosenPhoto: {
                fromOriginalEntryToEdit: null,
                //it wasn't userUploaded but this makes it easier and only affects the "alt" property
                //of the preview image
                userUploaded: true,
                urls: {
                    regular: null
                }
            }

        }
    }

    componentDidMount() {
        console.log('editEntry', this.props.match.params.id)
        api.requestSingleEntry(this.props.match.params.id, auth.getToken())
            .then(reply => {
                console.log("response came back with the entry info. Let's edit:",reply.body)
                this.setState(
                    {

                        title: reply.body.title,
                        mood: reply.body.mood,
                        q1a1: reply.body.q1a1,
                        q1a2: reply.body.q1a2,
                        q1a3: reply.body.q1a3,
                        q2: reply.body.q2,
                        q3: reply.body.q3,
                        q4: reply.body.q4,
                        lat: reply.body.lat,
                        lng: reply.body.lng,
                        chosenPhoto: {
                            fromOriginalEntryToEdit: true,
                            //it wasn't userUploaded but this makes it easier and only affects the "alt" property
                            //of the preview image
                            userUploaded: true,
                            urls: {
                                regular: reply.body.full_image_url
                            }
                        }
                    }
                )
            })

    }

    moodChange = (e) => {
        this.setState({ mood: e.target.value })

    }
    selectImage = (photo) => {
        this.setState({
            chosenPhoto: photo
        })
    }
    deleteChosenPhoto = () => {
        this.setState({
            chosenPhoto: null
        })
    }
    handleKeyPress = (event) => {
        //this checks if they pressed enter and prevents the default action(form submission) if they did
        if (event.which === 13) {
            event.preventDefault()
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();

        console.log("submitting form.")
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
        }

        //this whole function prepares the entry.
        // p1 and p2 check if the user has changed the address or photo (respectively)
        //and if not, they will be null, to avoid making new API calls to Google or firebase storage (respectively).

        //p1 sets the lat and lng according to the user-entered address.
        //in EditEntry, this ONLY happens if this.state.lat hasn't already been wiped out,
        //which happens if the user selects a new place.

        const p1 = this.state.lat ? api.requestLatLong(this.state.place)
            .then(object => {
                entryDataObj.lat = object.lat; entryDataObj.lng = object.lng
            }
            ) : null

        //p2 will check if the entryPhoto is from the original entry, i.e. hasn't been changed by the user
        //while they were editing their entry. 

        const p2 = !entryPhoto.fromOriginalEntryToEdit ? (
            entryPhoto.userUploaded ? (
                console.log("User chose to upload photo. Uploadng to Firebase:", entryPhoto),
                this.setState({ loadingWrite: true }),
                storageRef.child(`user_uploaded_photos/${auth.getUser().user_id}/${this.state.title}/${entryPhoto.name}`)
                    .put(entryPhoto)
                    .then(snapshot => {
                        entryDataObj.full_image_url = snapshot.downloadURL;
                        entryDataObj.thumbnail_image_url = snapshot.downloadURL;
                    })) :
                //but if the entryPhoto is not userUploaded, it's an unSplash object
                //with unsplash.com URLs in it, so we'll use those
                (console.log("user chose an unSplash image, image urls are:", entryPhoto.urls),
                    entryDataObj.full_image_url = entryPhoto.urls.regular,
                    entryDataObj.thumbnail_image_url = entryPhoto.urls.thumb)
        ) : null

        //if nothing was changed, p1 and p2 will both be null and Promise.all will resolve immediately.
        Promise.all([p1, p2])
            .then(() => {
                console.log("creating an entry with obj:", entryDataObj);
                api.editSingleEntry(entryDataObj, auth.getToken(),this.props.match.params.id).then(
                    results => console.log(results)
                )
            })
            .then(() => this.props.reloadEntries())
            .then(() => this.props.history.push("/dashboard/entries"))
    }

    render() {
        return (
            <div className="write-entry">
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 700 }}>
                        <PickImage mood={this.state.mood}
                            chosenPhoto={this.state.chosenPhoto}
                            selectImage={this.selectImage}
                            deleteChosenPhoto={this.deleteChosenPhoto}
                        />
                        <Header as="h2" textAlign="center">Write a new entry</Header>
                        <Form size="big" widths="equal" onKeyPress={this.handleKeyPress}>
                            <Form.Field>
                                <label>Give today a title</label>
                                <Input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Rate your mood from 1-10</label>
                                <Input type='range' min="1" max="10" value={this.state.mood} onChange={this.moodChange} />
                                <p>{this.state.mood}</p>
                            </Form.Field>
                            <Form.Field >
                                <label>What are three highlights of today?</label>
                                <Input type="text" value={this.state.q1a1} onChange={(e) => this.setState({ q1a1: e.target.value })} />
                                <Input type="text" value={this.state.q1a2} onChange={(e) => this.setState({ q1a2: e.target.value })} />
                                <Input type="text" value={this.state.q1a3} onChange={(e) => this.setState({ q1a3: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>What could you have done to make today better?</label>
                                <Input type='text' value={this.state.q2} onChange={(e) => this.setState({ q2: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>What is something you've always wanted to do?</label>
                                <Input type='text' value={this.state.q3} onChange={(e) => this.setState({ q3: e.target.value })} />
                            </Form.Field>
                            <Form.Field >
                                <label>Notes</label>
                                <Input type='text' value={this.state.q4} onChange={(e) => this.setState({ q4: e.target.value })} />
                            </Form.Field>
                            <Form.Field >
                                <label>Where did you go today?</label>
                                <Autocomplete
                                    style={{ width: '90%' }} onPlaceSelected={(place) => {
                                        this.setState({
                                            //if they chose a new place, then that's it: we null the old lat and lng
                                            //from the entry, and set a "place" variable from which we'll get
                                            //a new lat and lng when user clicks submit. 
                                            lat: null,
                                            lng: null,
                                            place: place.formatted_address
                                        });
                                        console.log("we formatted the user submitted address to:", place.formatted_address);
                                    }}
                                    types={[]}
                                    componentRestrictions={{}}
                                />

                            </Form.Field>
                            <Button onClick={this.handleSubmit}>{this.state.loadingWrite ? 'Uploading...' : 'Submit Changes'}</Button>
                        </Form>


                    </Grid.Column>

                </Grid>

            </div>
        );
    }
}

export default EditEntry;
