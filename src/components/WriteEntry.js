import React, { Component } from 'react';
import NavBar from './NavBar'
import Slider from './Slider'
import api from '../api.js'
import auth from '../auth'
import { Header, Button, Form, Grid, Image, Input } from 'semantic-ui-react'
// import PictureUpload from './PictureUpload'

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
        title: '',
        mood: '',
        q1a1: '',
        q1a2: '',
        q1a3: '',
        q2: '',
        q3: '',
        q4: ''
    }
}    
setSearchQuery = (rating) => {
    let searchQuery = 
    rating >=9 ? "yellow" : 
    rating >=7 ? "red" : 
    rating >= 5 ? "gray" : 
    rating >= 3 ? 'blue' : 
    rating >= 0 ? "black" : "walrus";
    return searchQuery;
  }
handleSubmit = (event) => {
        event.preventDefault();
        

        api.getUnsplashImage(this.setSearchQuery(this.state.mood)).then(response =>
        //fixing this in a sec
        {
            console.log(response);
            let entryDataObj = {
                title: this.state.title,
                mood: this.state.mood,
                q1a1: this.state.q1a1,
                q1a2: this.state.q1a2,
                q1a3: this.state.q1a3,
                q2: this.state.q2,
                q3: this.state.q3,
                q4: this.state.q4,
                full_image_url: response.body.urls.regular,
                thumbnail_image_url:response.body.urls.thumb
            }
            return entryDataObj;
        }).then(entryDataObj =>
            api.createSingleEntry(entryDataObj, auth.getToken())
                .then(() => this.props.history.push("/dashboard")))
    }

    render() {
        return (
            <div className="write-entry">
                    <NavBar hist={this.props.history} />
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
                                <Input type='text' value={this.state.mood} onChange={(e) => this.setState({ mood: e.target.value })} />
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

                            <Button>Submit</Button>
                        </Form>
                    </Grid.Column>

                </Grid>



                {/* <form onSubmit={this.handleSubmit}>
                    <div className="q0">
                        <input ref={r => this.q0a1Input = r} placeholder="enter a title here" />
                    </div>
                    <div className="mood" >
                        <p>rate your day</p>
                        <input type='text' ref={r => this.moodInp = r} />
                    </div>
                    <div className="q1">
                        <p>what were three highlights of today?</p>
                        <input type="text" ref={r => this.q1a1Input = r} />
                        <input type="text" ref={r => this.q1a2Input = r} />
                        <input type="text" ref={r => this.q1a3Input = r} />

                    </div>
                    <div className="q2">
                        <p>What could you have done to make today better?</p>
                        <input type="text" ref={r => this.q2a1Input = r} />
                    </div>
                    <div className="q3">
                        <p>what is something you've always wanted to do?</p>
                        <input type="text" ref={r => this.q3a1Input = r} />
                    </div>
                    <div className="q4">
                        <p>today's notes</p>
                        <input type="text" ref={r => this.q4a1Input = r} />
                    </div>
                    {/* this component is a stretch goal
                        <PictureUpload> */}
                
                {/* </form> */}
            </div>
        );
    }
}

export default WriteEntry;
