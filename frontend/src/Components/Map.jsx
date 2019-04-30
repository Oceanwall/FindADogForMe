import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick (props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked (props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    if (!this.props.location_objects || this.props.location_objects.length === 0 || !this.props.location_objects[0]["latitude"] || !this.props.location_objects[0]["longitude"] || !this.props.location_objects[0]["name"]) {
      return (
        <div></div>
      );
    }

    let markers = []
    for (let location_object of this.props.location_objects) {
      markers.push(<Marker position={{lat: location_object.latitude, lng: location_object.longitude}} name={location_object.name} onClick={this.onMarkerClick}/>);
    }

    return (
      <div>
        <Map
            google={this.props.google}
            zoom={this.props.zoom ? this.props.zoom : 6}
            style={{"width": "100%", "marginBottom": "30px"}}
            initialCenter={{
            lat: this.props.location_objects[0]["latitude"],
            lng: this.props.location_objects[0]["longitude"]
            }}
            onClick={this.onMapClicked}
          >
            {markers}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
                <div>
                  <div style={{"fontSize": "16px"}}>{this.state.selectedPlace.name}</div>
                </div>
            </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHfZpcIn3ShzuF_Ba5h7C_cv4ABWQs6_s'
})(MapContainer);
