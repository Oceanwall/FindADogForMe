import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import "../styles/Instance.css";
import DogCard from "./DogCard";
import ShelterCard from "./ShelterCard";
import CardDeck from "react-bootstrap/CardDeck";

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
      location: "",
      name: "",
      type: "",
      url: "",
      images: [],
      shelter_list: [],
      dog_list: [],
      weather: null,
      loaded_activity: false,
      loaded_shelter: false,
      loaded_dog: false
    };
    this.isLoaded = this.isLoaded.bind(this);
  }
  async updateActivity() {
    wrapper.getActivity(this.state.activityId).then(response => {
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
        location: response["location"],
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
  }

  async componentDidMount() {
    this.updateActivity();
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
    return (
      <div>
        <Container>
          <br />
          <Row>
            <Col>
              <h1> {this.state.name}</h1>
              <div class="info-text">
                <p align="left" className="mt-5">
                  URL: <a href={this.state.url}>{this.state.url}></a>
                </p>
                <p align="left"> Type: {this.state.type}</p>
                <p align="left"> Date: {this.state.date}</p>
                <p align="left"> Free: {this.state.is_free ? "Yes" : "No"}</p>
                <p align="left"> Location: {this.state.location}</p>
              </div>
            </Col>
            <Col xs={12} md={7} lg={6}>
              <InstanceCarousel images={this.state.images} />
            </Col>
          </Row>
          <Row>
            <Container className="mt-5">
              <div class="desc-text">
                <p align="left">{this.state.description}</p>
              </div>
            </Container>
          </Row>

          {dogCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                Dogs:
              </p>
              <CardDeck>
                <div class="card-deck">{dogCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Dogs: None
            </p>
          )}
          {shelterCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                Shelters:
              </p>
              <CardDeck>
                <div class="card-deck">{shelterCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Shelters: None
            </p>
          )}
        </Container>
      </div>
    );
  }
}
export default ActivityInstance;
