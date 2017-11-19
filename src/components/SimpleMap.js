import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import { MAPS_API_KEY } from '../config/config.js';

const Pin = props => {
    const dependsOnHover =
        props.$hover ? { "font-style": "bold", color: '#ffffff' } : { color: '#ff0000' };
    return <Link to={`/readentry/${props.entry.id}`}>
        <div style={{
            width: 100,
            height: 100,
            backgroundImage: `url(${props.entry.thumbnail_image_url})`
        }}>
            <p style={dependsOnHover}>{props.entry.title}
            </p>
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
            <div style={{ textAlign: "center", padding: 100 }}>

                <div style={{ width: 500, height: 500 }}>
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

            </div>


        );
    }
}

export default SimpleMap;