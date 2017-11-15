import React, { Component } from 'react';
import NavBar from './NavBar'
import Slider from './Slider'
import api from '../api.js'
import auth from '../auth'
// import PictureUpload from './PictureUpload'

/*
Logic:
onSubmit triggers function to send database to storage 
Stretch goal: rotate through different questions depending on day / random / mood
(shouldn't be too hard tbh)

gather data and put it into json and then api sends it to server OMG
*/



class WriteEntry extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const mood = this.moodInp.value;
        const contents = {
            q0: this.q0a1Input.value,
            q1: [this.q1a1Input.value, this.q1a2Input.value, this.q1a3Input.value],
            q2: this.q2a1Input.value,
            q3: this.q3a1Input.value,
            q4: this.q4a1Input.value
        }
        api.createSingleEntry(mood, contents, auth.getToken() )
        .then(() => this.props.history.push("/dashboard"))
    }

    render() {
        return (
            <div className="write-entry">
                <NavBar />
                <form onSubmit={this.handleSubmit}>
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
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default WriteEntry;
