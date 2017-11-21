import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { MAPS_API_KEY } from '../config/config.js';
import { Icon } from 'semantic-ui-react';



const FontAwesome = require('react-fontawesome')
// ${props.entry.thumbnail_image_url}
const Pin = props => {
    const dependsOnHover =
        props.$hover ? '4x' : '3x';
    return  <Link to={`/dashboard/readentry/${props.entry.id}`}>
                <div style={{
                    transform: 'translateY(-100%)',
                    width: 'auto',
                    height: 'auto', }}>
                    {/* <p style={{'color': 'black'} }>{props.entry.title} </p> */}
                    <FontAwesome name="map-marker" size={dependsOnHover} style={{color:'red'}} />
                    
                </div>
            </Link>
};
class SimpleMap extends Component {

    static defaultProps = {
        center: { lat: 45.50, lng: -73.56 },
        zoom: 12
    };

    // handleClick = (event) => {
    //     event.preventDefault();
    //     const place = this.cityInput.value;
    //     api.requestLatLong(place)
    //         .then(object => this.setState (
    //             {lat: object.lat,
    //             lng: object.lng}
    //         ))
    // }

    render() {
        console.log("the simplemap props are:", this.props)
        return (
            // <div style={{ textAlign: "center", padding: 100 }}>

                <div style={{ width: '100%', height: '70%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: MAPS_API_KEY
                        }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        {/* This will map over the geotaggedEntries array
                     and make a pin for each object. The props are three:
                     1)entry, which contains the entry object with title, imageurl, etc
                     2)lat, which is just the entry lat
                     3)ditto for lng
                     style={{ width: 500, height: 500 }}
                     */}

                        {this.props.geotaggedEntries ? this.props.geotaggedEntries.map(entry => <Pin entry={entry} lat={entry.lat} lng={entry.lng} />) : null}


                        {/* <Pin
                            lat={45.50}
                            lng={-73.56}
                            text={'entry 0'}
                        />
                        <Pin
                            lat={this.props.geotaggedEntries[0].lat}
                            lng={this.props.geotaggedEntries[0].lng}
                            text={'this is the texts prop and it will get rendered in the div'}
                        /> */}
                    </GoogleMapReact>
                </div>

            // </div>


        );
    }
}

export default SimpleMap;