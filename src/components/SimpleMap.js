import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { MAPS_API_KEY } from '../config/config.js';
import { Icon } from 'semantic-ui-react';
import EntryPreview from './EntryPreview';



const FontAwesome = require('react-fontawesome')
// ${props.entry.thumbnail_image_url}
const Pin = props => {

    const pinSize = props.$hover ? '4x' : '3x';
    return (<Link to={`/dashboard/readentry/${props.entry.id}`}>
        <div style={{
            transform: 'translateY(-100%)',
            width: 'auto',
            height: 'auto',
        }}
        >
            <FontAwesome name="map-marker" size={pinSize} style={{ color: 'red' }} />
        </div>
    </Link>)

};
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
            <div>
            
            <h2>{`Where you were over the past ${this.props.period} days`}</h2>
            <div style={{ width: '100%', height: '70vh', display:'flex' }}>
            
                <div className='mapWrapper' style={{ width: '70%', height: '55vh' }}>
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

                        {this.props.geotaggedEntries ? this.props.geotaggedEntries.map(entry => <Pin entry={entry} lat={entry.lat} lng={entry.lng} />) : null}

                    </GoogleMapReact>
                </div>
                <div className="preview" style={{'padding-left':'2%'}} >
                {this.state.hoveredMapPoint ?
                    <EntryPreview data={this.state.hoveredMapPoint} key={this.state.hoveredMapPoint.id} />
                    : null}
                </div>
                
               
               
            </div>

            </div>

        );
    }
}

export default SimpleMap;