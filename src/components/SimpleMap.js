import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { MAPS_API_KEY } from '../config/config.js';
import { Icon } from 'semantic-ui-react';
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
    left: 15%;
    position: absolute; 
    width: 75%; 
    height: 100%; 
    display: grid;
    top: 4em;
   
   ${'' /* width: 70vw; */}
`

const MapWrapper = styled.div`
    width: 100%; 
    height: 60%
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
                  <Link to={`/dashboard/readentry/${props.entry.id}`}> <img src={props.entry.thumbnail_image_url}/></Link>
                </Preview> :
                null
            }
            <FontAwesome name="map-marker" size={pinSize} style={{ color: 'red' }} />
        </div>
    )
}
class SimpleMap extends Component {
    constructor() {
        super()
        this.state = {
            hoveredMapPoint: null
        }
    }

    static defaultProps = {
        center: { lat: 45.50, lng: -73.56 },
        zoom: 12
    };

    render() {
        console.log("the simplemap props are:", this.props)
        return (
            // <MapPageWrapper>
                <MapWrapper>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: MAPS_API_KEY
                        }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        resetBoundsOnResize={true}
                        onChildMouseEnter={(i) => {
                            console.log('child', this.props.geotaggedEntries[i]);
                            this.setState({ hoveredMapPoint: this.props.geotaggedEntries[i] })
                        }}

                    >
                        {/* This will map over the geotaggedEntries array
                     and make a pin for each object. The props are three:
                     1)entry, which contains the entry object with title, imageurl, etc
                     2)lat, which is just the entry lat
                     3)ditto for lng
                     style={{ width: 500, height: 500 }}
                     */}

                        {this.props.geotaggedEntries ? this.props.geotaggedEntries.map(entry => <Pin entry={entry} lat={entry.lat} lng={entry.lng} data={this.state.hoveredMapPoint} />) : null}

                    </GoogleMapReact>
                </MapWrapper>
            // </MapPageWrapper>

        );
    }
}

export default SimpleMap;