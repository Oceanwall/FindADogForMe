import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '50vh'
};

export class MapContainer extends Component {
  render() {
    console.log(this.props.lat);
    return (
        <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
            }}
        >
            <Marker position={{lat: this.props.lat, lng: this.props.lng}}/>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHfZpcIn3ShzuF_Ba5h7C_cv4ABWQs6_s'
})(MapContainer);
