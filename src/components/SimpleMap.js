import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { MAPS_API_KEY } from '../config/config.js';
import { Button } from 'semantic-ui-react';
import EntryPreview from './EntryPreview';
import styled from 'styled-components';

const FontAwesome = require('react-fontawesome')


const Preview = styled.div` 
width:200px;
position: absolute;
padding: 5px;
background: #fff;
top: 0;
transform: translate(-25%, -100%);
border-radius: 2px;
display:flex;
flex-direction:column;
`

const MapPageWrapper = styled.div`
   width: 100%; 
    height: 100%
    ${'' /* left: 15%;
    position: absolute; 
    width: 75%; 
    height: 100%; 
    display: grid;
    top: 4em; */}
   
   ${'' /* width: 70vw; */}
`

const MapWrapper = styled.div`
    width: 100%; 
    height: 60%
`

const Slider = styled.div`

`


const displayDate = timeStamp => {
    let newDateArray = timeStamp.split('T');
    let justDate = newDateArray[0];
    return justDate;
}

const Pin = props => {
    const pinSize = props.$hover ? '4x' : '3x';
    return (
        <div style={{
            transform: 'translateY(-100%)',
            width: 'auto',
            height: 'auto',
        }}>
            {props.data === props.entry ?
            
                <Preview>
                    <Link to={`/dashboard/readentry/${props.entry.id}`}>
                            <img 
                            style={{"maxWidth":"100%",margin:"auto"}}
                            src={props.entry.thumbnail_image_url} />
                        </Link>
                    <div style={{margin:"10px auto"}}><div>{props.entry.title}
                        </div><div>{displayDate(props.entry.createdAt)}</div></div>
                </Preview> 
                :
                null
            }
            <FontAwesome name="map-marker" size={pinSize} style={{ color: 'red' }} />
        </div>
    )
}
class SimpleMap extends Component {
    constructor(props) {
        super()
        this.state = {
            center: props.center,
            zoom: props.zoom,
            hoveredMapPoint: null,
            // daysWhichContainEntries: {},
            entryCurrentlyFocused: 0,
            sliderActivated: false,
            sliderIsPlaying: false,
            showSingleEntry: false
        }
    }
    componentDidMount() {
        if (this.props.geotaggedEntries.length >0){
            let entryList = this.props.geotaggedEntries
            this.setState({
                center:{lat:entryList[entryList.length-1].lat+0.05,lng:entryList[entryList.length-1].lng},              
                hoveredMapPoint:entryList[entryList.length-1]
                
            })}
            
    }

    componentWillReceiveProps(nextProps) {
        console.log("the simplemap props are:", nextProps)

        if (nextProps.geotaggedEntries.length > 0){
            let entryList=nextProps.geotaggedEntries
            this.setState({ 
                center:{lat:entryList[entryList.length-1].lat+0.05,lng:entryList[entryList.length-1].lng},           
               hoveredMapPoint:entryList[entryList.length-1]
            })
        }
    }

    componentWillUnmount(){
        clearInterval(this.state.sliderStopperID)
        
    }
    //awesome day-finding function we'll no longer use. sick algorithms child
    loadDaysWithEntries = (entries) => {
        let d = []
        let counter = 0

        const myFunc = entry => {
            //this is grace's displayDate function which returns the date from a timestamp
            let date = displayDate(entry.createdAt)

            if (!d[counter]) {
                d[counter] = { date: date, entries: [entry.id] }
            }

            else if (d[counter].date === date) {
                d[counter].entries.push(entry.id)
            }
            else {
                counter++;
                myFunc(entry)
            }


        }

        entries.forEach(myFunc)
        this.setState({ daysWhichContainEntries: d })

    }



    handleSliderChange = (e) => {
        let sliderValue = parseInt(e.target.value)
        this.changeEntryDisplayed(sliderValue)
    }
    changeEntryDisplayed = (entryNumber) => {
        console.log("changed entry displayed to:", this.props.geotaggedEntries[entryNumber])
        this.setState({
            center: {
                lat: this.props.geotaggedEntries[entryNumber].lat + 0.06,
                lng: this.props.geotaggedEntries[entryNumber].lng
            },
            zoom: 10,
            entryCurrentlyFocused: entryNumber,
            hoveredMapPoint: this.props.geotaggedEntries[entryNumber]
        })
    }
    //we don't go to ravenholm anymore
    //and we don't use toggleSlider... DEPRECATED!
    toggleSlider = () => {
        if (!this.state.sliderActivated) {
            this.setState({
                sliderButtonText: "deactivate Slider",
                center: {
                    lat: this.props.geotaggedEntries[0].lat,
                    lng: this.props.geotaggedEntries[0].lng
                },
                sliderActivated: true
            })
        }
        if (this.state.sliderActivated) {
            this.setState({
                sliderButtonText: "activate Slider",
                center: this.props.center,
                sliderActivated: false
            })
        }
    }
    togglePlayPause = () => {
        if (this.state.sliderIsPlaying) {
            this.pauseSlider()
        }
        else { this.playSlider() }
    }

    stepLeft = () => {
        if (this.state.entryCurrentlyFocused > 0) {
            this.changeEntryDisplayed(this.state.entryCurrentlyFocused - 1)
        }
    }
    stepRight = () => {
        if (this.state.entryCurrentlyFocused < this.props.geotaggedEntries.length-1)
            this.changeEntryDisplayed(this.state.entryCurrentlyFocused + 1)
    }
    playSlider = () => {
        //
        //centers it over the currently focused entry, cause that's where we're gonna start.
        //also hovers it.
        // this.changeEntryDisplayed[this.state.entryCurrentlyFocused]
        this.setState({
            //turns on "show single entry" as default behaviour
            showSingleEntry: true,
            center: {
                lat: this.props.geotaggedEntries[this.state.entryCurrentlyFocused].lat + 0.05,
                lng: this.props.geotaggedEntries[this.state.entryCurrentlyFocused].lng
            },
            zoom: 10,
            hoveredMapPoint: this.props.geotaggedEntries[this.state.entryCurrentlyFocused]
            
        })
        let sliderStopperID =
            setInterval(() => {
                if (this.state.entryCurrentlyFocused >= this.props.geotaggedEntries.length - 1) {
                    //if the current entry is the last one,
                    //stop this interval function from occurring,
                    //and tell the state the slider is not playing anymore.
                    clearInterval(this.state.sliderStopperID)
                    this.setState({ sliderIsPlaying: false })
                }
                else {
                    //if it's not the last one, 
                    //step forward by one
                    let nextOnePlease = this.state.entryCurrentlyFocused + 1
                    this.changeEntryDisplayed(nextOnePlease);
                }
            },
                //and do this every 3000 milliseconds
                2000)
        this.setState({
            sliderStopperID: sliderStopperID,
            sliderIsPlaying: true
        })
    }

    pauseSlider = () => {
        clearInterval(this.state.sliderStopperID)
        this.setState({ sliderIsPlaying: false })
    }
    playPauseSymbol = () => {
        if (this.state.sliderIsPlaying) {
            return <FontAwesome name="pause" />
        } else { return <FontAwesome name="play" /> }
    }

    showSingleEntryToggle = () => {
        if (this.state.showSingleEntry === false) {
            this.setState({
                showSingleEntry: true
            })
        }
        else {
            this.setState({
                showSingleEntry: false
            })
        }
    }

    renderPins = (entries) => {
        //must take an array
        let renderedPins =
            entries.map(entry =>
                <Pin entry={entry} lat={entry.lat} lng={entry.lng} data={this.state.hoveredMapPoint} />)
        return renderedPins
    }

    decideWhichPinsToRender = () => {
        if (this.props.geotaggedEntries.length > 0) {
            if (this.state.showSingleEntry) {
                //since it's got to be an array passed to renderPins, we'll make it an array
                //with one index
                let singleEntryArray = [this.props.geotaggedEntries[this.state.entryCurrentlyFocused]]
                return this.renderPins(singleEntryArray)
            }
            else {
                return this.renderPins(this.props.geotaggedEntries)
            }
        }
        else { return null }
    }

    static defaultProps = {
        center: { lat: 45.50, lng: -73.56 },
        zoom: 12
    };

    render() {
        return (
            <MapPageWrapper>
                <MapWrapper>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: MAPS_API_KEY
                        }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        resetBoundsOnResize={true}
                        onChildMouseEnter={(i) => {
                            console.log('child', this.props.geotaggedEntries[i]);
                            this.setState({ hoveredMapPoint: this.props.geotaggedEntries[i] })
                        }}

                    >
                        {/* This will map over the geotaggedEntries array (if it exists yet)
                     and make a pin for each object. The props are three:
                     1)entry, which contains the entry object with title, imageurl, etc
                     2)lat, which is just the entry lat
                     3)ditto for lng
                     style={{ width: 500, height: 500 }}
                     */}

                        {this.decideWhichPinsToRender()
                        }

                    </GoogleMapReact>


                </MapWrapper>
                <Slider>
                    <div style={{ display: "flex", padding: '2rem 0' }}>
                        <Button onClick={this.showSingleEntryToggle}>{this.state.showSingleEntry ? "show all entries" : "show single entry"}</Button>
                        <Button onClick={this.stepLeft}><FontAwesome name="step-backward" /></Button>
                        <Button onClick={this.togglePlayPause}>{this.playPauseSymbol()}</Button>
                        <Button onClick={this.stepRight}><FontAwesome name="step-forward" /></Button>
                    </div>
                </Slider>
            </MapPageWrapper>
        );
    }
}

export default SimpleMap;