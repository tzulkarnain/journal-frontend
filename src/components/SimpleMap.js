import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { MAPS_API_KEY } from '../config/config.js';
import { Icon, Input, Button } from 'semantic-ui-react';
import EntryPreview from './EntryPreview';
import styled from 'styled-components';

const Preview = styled.div` 
position: absolute;
padding: 5px;
background: #fff;
top: 0;
transform: translate(-25%, -100%);
border-radius: 2px;
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

const FontAwesome = require('react-fontawesome')
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
                    <Link to={`/dashboard/readentry/${props.entry.id}`}> <img src={props.entry.thumbnail_image_url} /></Link>
                </Preview> :
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
            center:props.center,
            zoom:props.zoom,
            hoveredMapPoint: null,
            // daysWhichContainEntries: {},
            entryCurrentlyDisplayed: 0,
            sliderActivated: false,
            geotaggedEntriesLoading: true
        }
    }
    componentDidMount() {
        this.props.geotaggedEntries.length > 0 ? (
            // this.loadDaysWithEntries(this.props.geotaggedEntries),
            this.setState({
                geotaggedEntriesLoading: false
            }))
            :
            null
    }

    componentWillReceiveProps(nextProps) {
        console.log("the simplemap props are:", nextProps)

        nextProps.geotaggedEntries.length > 0 ? (
            // this.loadDaysWithEntries(nextProps.geotaggedEntries),
            this.setState({ geotaggedEntriesLoading: false }))
            :
            null
    }
    //awesome day-finding function we'll no longer use. sick algorithms child
    loadDaysWithEntries = (entries) => {
        let d = []
        let counter = 0

        const myFunc = entry => {
            //this is grace's displayDate function which returns the date from a timestamp
            let date = this.displayDate(entry.createdAt)

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

    displayDate = timeStamp => {
        let newDateArray = timeStamp.split('T');
        let justDate = newDateArray[0];
        return justDate;
    }

    changeEntryDisplayed = (e) => {
        let sliderValue = parseInt(e.target.value)
        console.log("changed entry displayed to:",this.props.geotaggedEntries[sliderValue])
        this.setState({
            center: {
                lat:this.props.geotaggedEntries[sliderValue].lat,
                lng:this.props.geotaggedEntries[sliderValue].lng
                    },
            
            entryCurrentlyDisplayed: sliderValue
        })
    }
    activateSlider = () => {
        this.setState({ sliderActivated: true })
    }

    renderPins = (entries) => {
        let renderedPins =
            entries.map(entry =>
                <Pin entry={entry} lat={entry.lat} lng={entry.lng} data={this.state.hoveredMapPoint} />)
        return renderedPins
    }

    decideWhichPinsToRender = () => {
        if (this.props.geotaggedEntries.length > 0) {
            if (this.state.sliderActivated === false) {
                return this.renderPins(this.props.geotaggedEntries)
            }

            else {
                return this.renderPins([this.props.geotaggedEntries[this.state.entryCurrentlyDisplayed]])
            }
        }
        else { console.log("still no entries loaded") }
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
                    <Button onClick={this.activateSlider}>activate slider</Button>
                    <Input onChange={this.changeEntryDisplayed} value={this.state.entryCurrentlyDisplayed} min={0} max={this.props.geotaggedEntries.length - 1} style={{ width: "100%" }} type="range" />
                </Slider>
            </MapPageWrapper>
        );
    }
}

export default SimpleMap;