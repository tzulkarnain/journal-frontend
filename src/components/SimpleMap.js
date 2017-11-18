import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MAPS_API_KEY } from '../config/config.js';
import api from '../api.js';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

    static defaultProps = {
        center: { lat: 45.50, lng: -73.56 },
        zoom: 12
    };

    handleClick = (event) => {
        event.preventDefault();
        const place = this.cityInput.value;
        api.requestLatLong(place)
            .then(object => this.setState (
                {lat: object.lat,
                lng: object.lng}
            ))
    }

    render() {
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
                        <AnyReactComponent
                            lat={this.state.lat}
                            lng={this.state.lng}
                            text={'^'}
                        />
                    </GoogleMapReact>
                </div>

            </div>


        );
    }
}

export default SimpleMap;