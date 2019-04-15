import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    console.log( this.props.location_objects);
    if (!this.props.location_objects || this.props.location_objects.length == 0 || !this.props.location_objects[0]["latitude"] || !this.props.location_objects[0]["longitude"])
      return null;
    let markers = []
    // console.log( this.props.location_objects);
    for (let location_object of this.props.location_objects) {
      markers.push(<Marker position={{lat: location_object.latitude, lng: location_object.longitude}}/>);
    }

    console.log(markers);
    return (
      <div>
        <Map
            google={this.props.google}
            zoom={14}
            style={{"width": "100%"}}
            initialCenter={{
            lat: this.props.location_objects[0]["latitude"],
            lng: this.props.location_objects[0]["longitude"]
            }}
          >
            {markers}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHfZpcIn3ShzuF_Ba5h7C_cv4ABWQs6_s'
})(MapContainer);
