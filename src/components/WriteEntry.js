import React, { Component } from 'react';
import NavBar from './NavBar'
import Slider from './Slider'
// import PictureUpload from './PictureUpload'


class WriteEntry extends Component {
    render() {
        return (
            <div className="write-entry">
                <NavBar />
                <form onSubmit={this.handleSubmit}>
                    <div className="entry-title-input">
                        <input ref={r => this.titleInp = r} placeholder="enter a title here" />
                    </div>
                    <div>
                        <p>rate your day</p>
                        <Slider />
                    </div>
                    <div className="entry-highlight-inputs">
                        <p>what were three highlights of today?</p>
                        <input type="text" ref={r => this.highlightInp1 = r} />
                        <input type="text" ref={r => this.highlightInp2 = r} />
                        <input type="text" ref={r => this.highlightInp3 = r} />

                    </div>
                    <div>
                        <p>What could you have done to make today better?</p>
                        <input type="text" ref={r => this.betterInp = r} />
                    </div>
                    <div>
                        <p>what is something you've always wanted to do?</p>
                        <input type="text" ref={r => this.wantedInp = r} />
                    </div>
                    <div>
                        <p>today's notes</p>
                        <input type="text" ref={r => this.wantedInp = r} />
                    </div>
                    {/* this component is a stretch goal
                        <PictureUpload> */}
                </form>
            </div>
        );
    }
}

export default WriteEntry;
