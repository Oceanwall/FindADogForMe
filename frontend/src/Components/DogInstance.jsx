import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import "../styles/Instance.css";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";
import MapContainer from "./Map";
import Button from "react-bootstrap/Button";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class DogInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogId: props.match.params.dogId,
      description: "",
      shelter: "",
      shelter_id: "",
      breed: "",
      age: "",
      size: "",
      name: "",
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      images: [],
      nearby_activities: [],
      loaded_shelter: false,
      loaded_dog: false,
      loaded_activities: false,
      collapse: false
    };
    this.isLoaded = this.isLoaded.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  async updateDog() {
    wrapper.getDogShelter(this.state.dogId).then(response => {
      this.setState(state => ({
        shelter_id: response["id"],
        shelter: response["name"],
        latitude: response["latitude"],
        longitude: response["longitude"],
        loaded_shelter: true
      }));
    });
    wrapper.getDog(this.state.dogId, undefined).then(response => {
      //console.log(response);
      this.setState(state => ({
        description: response["description"],
        breed: response["breed"],
        age: response["age"],
        size: response["size"],
        name: response["name"],
        img1: response["image_1"],
        img2: response["image_2"],
        img3: response["image_3"],
        img4: response["image_4"],
        loaded_dog: true
      }));
      let imageArray = [];
      if (this.state.img1 != null) {
        imageArray.push(this.state.img1);
      }
      if (this.state.img2 != null) {
        imageArray.push(this.state.img2);
      }
      if (this.state.img3 != null) {
        imageArray.push(this.state.img3);
      }
      if (this.state.img4 != null) {
        imageArray.push(this.state.img4);
      }

      this.setState({ images: imageArray });

      wrapper.getDogActivities(this.state.dogId).then(response => {
        this.setState(state => ({
          nearby_activities: response["objects"],
          loaded_activities: true
        }));
      });
    });
  }

  async componentDidMount() {
    this.updateDog();
  }

  isLoaded() {
    return (
      this.state.loaded_activities &&
      this.state.loaded_dog &&
      this.state.loaded_shelter
    );
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    let activityCards = [];
    if (this.isLoaded()) {
      activityCards = this.state.nearby_activities.map(activity => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <ActivityCard activity={activity} />
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
                  Shelter:{" "}
                  <Link to={`/shelters/${this.state.shelter_id}`}>
                    {this.state.shelter}
                  </Link>
                </p>
                <p align="left" className="capitalize">
                  Breed:{" "}
                  <Link to={`/breeds/${this.state.breed}`}>
                    {this.state.breed}
                  </Link>
                </p>
                <p align="left"> Age: {this.state.age}</p>
                <p align="left"> Size: {this.state.size}</p>
              </div>
            </Col>
            <Col xs={12} md={7} lg={6}>
              <InstanceCarousel images={this.state.images} />
            </Col>
          </Row>
          <Row>
            <Col>
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
                      <div>
                        <p align="left">
                          {this.state.description.substring(0, 750)}}...
                        </p>

                        <Button
                          color="primary"
                          onClick={this.toggle}
                          style={{ marginBottom: "1rem" }}
                        >
                          Read More
                        </Button>
                      </div>
                    ]
                  )
                ) : (
                  <p align="left">Description: None</p>
                )}
              </div>
            </Col>
            {this.state.latitude && this.isLoaded() &&
              <Col xs={12} md={7} lg={6} className="mt-2 mb-1" style={{'height': '50vh', 'paddingLeft': '0px'}}>
                <MapContainer location_objects={[{latitude: this.state.latitude, longitude: this.state.longitude, name: this.state.shelter}]}/>
              </Col>
            }
          </Row>

          {activityCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                Activities suitable for this dog:
              </p>
              <CardDeck>
                <div class="card-deck">{activityCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Activities suitable for this dog: None
            </p>
          )}
        </Container>
      </div>
    );
  }
}
export default DogInstance;
