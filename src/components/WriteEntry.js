import React, { Component } from 'react';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth'
import { Header, Button, Form, Grid, Input } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete';

/*
Logic:

Stretch goal: rotate through different questions depending on day / random / mood
(shouldn't be too hard tbh)

gather data and put it into json and then api sends it to server OMG
*/



class WriteEntry extends Component {
    constructor() {
        super()
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
            lng: null
        }
    }
    setSearchQuery = (rating) => {
        let searchQuery =
            rating >= 9 ? "color" :
                rating >= 7 ? "horizon" :
                    rating >= 5 ? "calm" :
                        rating >= 3 ? 'rain' :
                            rating >= 0 ? "dark" : "walrus";
        return searchQuery;
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const p1 = api.requestLatLong(this.state.place)
            .then(object => this.setState(
                {
                    lat: object.lat,
                    lng: object.lng
                }
            ))


        const p2 = api.getUnsplashImage(this.setSearchQuery(this.state.mood))
        Promise.all([p1, p2])
            .then(results => {
                console.log(results);
                let entryDataObj = {
                    title: this.state.title,
                    mood: this.state.mood,
                    q1a1: this.state.q1a1,
                    q1a2: this.state.q1a2,
                    q1a3: this.state.q1a3,
                    q2: this.state.q2,
                    q3: this.state.q3,
                    q4: this.state.q4,
                    full_image_url: results[1].body.urls.regular,
                    thumbnail_image_url: results[1].body.urls.thumb,
                    lat: this.state.lat,
                    lng: this.state.lng
                }
                return entryDataObj;
            }).then(entryDataObj =>
                api.createSingleEntry(entryDataObj, auth.getToken())
                    .then(() => this.props.history.push("/dashboard")))
    }

    render() {
        return (
            <div className="write-entry">
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 700 }}>
                        <Header as="h2" textAlign="center">Write a new entry</Header>
                        <Form size="big" widths="equal" onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Give today a title</label>
                                <Input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Rate your mood from 1-10</label>
                                <Input type='range' min="1" max="10" value={this.state.mood} onChange={(e) => this.setState({ mood: e.target.value })} />
                                <p>{this.state.mood}</p>
                            </Form.Field>
                            <Form.Field >
                                <label>What are three hightlights of today?</label>
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
                                style={{ width: '90%' }}  onPlaceSelected={(place) => {this.setState({ place: place.formatted_address }); console.log(place.formatted_address);}}
                                    types={[]}
                                    componentRestrictions={{}}
                                />

                                {/* <Input type='text' value={this.state.place} onChange={(e) => this.setState({ place: e.target.value })} /> */}
                            </Form.Field>
                            <Button>Submit</Button>
                        </Form>
                    </Grid.Column>

                </Grid>

            </div>
        );
    }
}

export default WriteEntry;
