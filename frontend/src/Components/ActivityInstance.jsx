import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import "../styles/Instance.css";
import DogCard from "./DogCard";
import ShelterCard from "./ShelterCard";
import BreedCard from "./BreedCard";
import CardDeck from "react-bootstrap/CardDeck";
import MapContainer from "./Map";
import Button from "react-bootstrap/Button";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class ActivityInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityId: props.match.params.activityId,
      date: "",
      description: "",
      designation: "",
      image_1: null,
      image_2: null,
      image_3: null,
      is_active: null,
      is_free: null,
      latitude: null,
      longitude: null,
      location: "",
      name: "",
      type: "",
      url: "",
      images: [],
      shelter_list: [],
      dog_list: [],
      breed_list: [],
      weather: null,
      loaded_activity: false,
      loaded_shelter: false,
      loaded_dog: false,
      collapse: false
    };
    this.isLoaded = this.isLoaded.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  async updateActivity() {
    wrapper.getActivity(this.state.activityId).then(response => {
      console.log(response["location"]);
      let comma = response["location"].substring(0, 2);
      if (comma === ", ") {
        this.setState({
          location: response["location"].substring(
            2,
            response["location"].length
          )
        });
      } else {
        this.setState({ location: response["location"] });
      }

      this.setState(state => ({
        date: response["date"],
        description: response["description"],
        designation: response["designation"],
        image_1: response["image_1"],
        image_2: response["image_2"],
        image_3: response["image_3"],
        is_active: response["is_active"],
        is_free: response["is_free"],
        latitude: response["latitude"],
        longitude: response["longitude"],
        name: response["name"],
        type: response["type"],
        url: response["url"],
        weather: response["weather"],
        loaded_activity: true
      }));
      let imageArray = [];
      if (this.state.image_1 != null) {
        imageArray.push(this.state.image_1);
      }
      if (this.state.image_2 != null) {
        imageArray.push(this.state.image_2);
      }
      if (this.state.image_3 != null) {
        imageArray.push(this.state.image_3);
      }
      if (this.state.image_4 != null) {
        imageArray.push(this.state.image_4);
      }

      this.setState({ images: imageArray });
    });
    wrapper.getActivityShelters(this.state.activityId).then(response => {
      this.setState(state => ({
        shelter_list: response["objects"],
        loaded_shelter: true
      }));
    });
    wrapper.getActivityDogs(this.state.activityId, 0.25).then(response => {
      this.setState(state => ({
        dog_list: response,
        loaded_dog: true
      }));
    });
    wrapper.getActivityBreeds(this.state.activityId).then(response => {
      console.log("Activity breeds: ", response);
      this.setState({
        breed_list: response["objects"],
        loaded_dog: true
      });
    });
  }

  async componentDidMount() {
    this.updateActivity();
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  isLoaded() {
    return (
      this.state.loaded_activity &&
      this.state.loaded_dog &&
      this.state.loaded_shelter
    );
  }

  render() {
    let dogCards = [];
    if (this.isLoaded()) {
      dogCards = this.state.dog_list.map(dog => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <DogCard dog={dog} />
          </div>
        );
      });
    }
    let shelterCards = [];
    if (this.isLoaded()) {
      shelterCards = this.state.shelter_list.map(shelter => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <ShelterCard shelter={shelter} />
          </div>
        );
      });
    }
    let breedCards = [];
    if (this.isLoaded()) {
      breedCards = this.state.breed_list.map(breed => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <BreedCard breed={breed} />
          </div>
        );
      });
    }
    return (
      <div>
        <Container>
          <br />
          <Row>
            <Col>
              <h1> {this.state.name}</h1>
              <div class="info-text">
                <p align="left" className="mt-5">
                  URL: <a href={this.state.url}>Learn more about this event</a>
                </p>

                {this.state.date != null ? (
                  <div>
                    <p align="left">Date: {this.state.date}</p>
                  </div>
                ) : (
                  <div>
                    <p align="left">Designation: {this.state.designation}</p>
                  </div>
                )}
                <p align="left" className="capitalize">
                  {" "}
                  Type: {this.state.type}
                </p>

                <p align="left"> Free: {this.state.is_free ? "Yes" : "No"}</p>
                <p align="left"> Location: {this.state.location}</p>
              </div>
            </Col>
            <Col xs={12} md={7} lg={6}>
              <InstanceCarousel images={this.state.images} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12} md={6}>
              <Container>
                <div class="desc-text">
                  {this.state.description != undefined ? (
                    this.state.collapse ? (
                      [
                        <p align="left">{this.state.description}</p>,
                        <Button
                          color="primary"
                          onClick={this.toggle}
                          style={{ marginBottom: "1rem" }}
                        >
                          Read Less
                        </Button>
                      ]
                    ) : (
                      [
                        <p align="left">
                          {this.state.description.substring(0, 750)}...
                        </p>,
                        <Button
                          color="primary"
                          onClick={this.toggle}
                          style={{ marginBottom: "1rem" }}
                        >
                          Read More
                        </Button>
                      ]
                    )
                  ) : (
                    <p align="left">Description: None</p>
                  )}
                </div>
              </Container>
            </Col>
            {this.state.latitude && this.isLoaded() &&
              <Col xs={12} md={6} className="mt-2 mb-1" id="google-map" style={{'height': '50vh', 'paddingLeft': '0px'}}>
                <MapContainer location_objects={[{latitude: this.state.latitude, longitude: this.state.longitude, name: this.state.name}]}/>
              </Col>
            }
          </Row>

          {dogCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                Dogs suitable for this activity:
              </p>
              <CardDeck>
                <div class="card-deck">{dogCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Dogs suitable for this activity: None
            </p>
          )}

          {shelterCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                Shelters near this activity:
              </p>
              <CardDeck>
                <div class="card-deck">{shelterCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Shelters near this activity: None
            </p>
          )}

          {breedCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                Breeds suitable for this activity:
              </p>
              <CardDeck>
                <div class="card-deck">{breedCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Breeds suitable for this activity: None
            </p>
          )}
        </Container>
      </div>
    );
  }
}
export default ActivityInstance;
