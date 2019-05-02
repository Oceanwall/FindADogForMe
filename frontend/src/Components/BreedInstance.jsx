import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import DogCard from "./DogCard";
import ActivityCard from "./ActivityCard";
import ShelterCard from "./ShelterCard";
import MapContainer from "./Map";
import "../styles/Instance.css";
import InstanceSlider from "./InstanceSlider";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class BreedInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breedId: props.match.params.breedId,
      name: "",
      temperament: "",
      max_height: "",
      min_height: "",
      max_weight: "",
      min_weight: "",
      max_lifespan: "",
      min_lifespan: "",
      image_1: null,
      image_2: null,
      image_3: null,
      image_4: null,
      group: "",
      dog_list: [],
      activity_list: [],
      shelter_list: [],
      images: [],
      loaded: false
    };
  }

  async updateBreed() {
    wrapper.getBreed(this.state.breedId).then(response => {
      let breed = response["objects"][0];
      this.setState(
        {
          name: breed["name"],
          temperament: breed["temperament"],
          max_height: breed["max_height"],
          min_height: breed["min_height"],
          max_weight: breed["max_weight"],
          min_weight: breed["min_weight"],
          max_lifespan: breed["max_lifespan"],
          min_lifespan: breed["min_lifespan"],
          image_1: breed["image_1"],
          image_2: breed["image_2"],
          image_3: breed["image_3"],
          image_4: breed["image_4"],
          group: breed["group"]
        },
        async () =>
          wrapper.getBreedDogs(this.state.name, undefined).then(response => {
            this.setState(
              {
                dog_list: response["objects"]
              },
              async () =>
                wrapper.getBreedActivities(this.state.name).then(response => {
                  this.setState(
                    {
                      activity_list: response["objects"]
                    },
                    async () => {
                      let shelters = [];
                      for (let dog of this.state.dog_list) {
                        shelters.push(
                          await wrapper.getShelter(dog["shelter_id"])
                        );
                      }
                      this.setState({
                        shelter_list: shelters
                      });
                    }
                  );
                })
            );
          })
      );
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
      this.setState({ images: imageArray, loaded: true });
    });
  }

  async componentDidMount() {
    this.updateBreed();
  }

  render() {
    let dogCards = [];
    if (this.state.loaded) {
      dogCards = this.state.dog_list.map(dog => {
        return (
          <div>
            <DogCard dog={dog} />
          </div>
        );
      });
    }
    let shelterCards = [];
    if (this.state.loaded) {
      shelterCards = this.state.shelter_list.map(shelter => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <ShelterCard shelter={shelter} />
          </div>
        );
      });
    }
    let activityCards = [];
    if (this.state.loaded) {
      activityCards = this.state.activity_list.map(activity => {
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
              <h1 className="capitalize"> {this.state.name}</h1>
              <div className="mt-4 info-text">
                <p align="left">
                  <span className="info-bold">Group:</span> {this.state.group}
                </p>
                <p align="left">
                  <span className="info-bold">Temperament:</span>{" "}
                  {this.state.temperament}
                </p>
                <p align="left">
                  <span className="info-bold">Lifespan:</span>{" "}
                  {this.state.min_lifespan} - {this.state.max_lifespan} years
                </p>
                <p align="left">
                  <span className="info-bold">Height:</span>{" "}
                  {this.state.min_height} - {this.state.max_height} inches
                </p>
              </div>
            </Col>
            <Col xs={12} md={7} lg={6}>
              <InstanceCarousel images={this.state.images} />
            </Col>
          </Row>

          {this.state.shelter_list && this.state.shelter_list.length > 0 && (
            <Row>
              <Col
                xs={12}
                id="google-map"
                className="mt-2 mb-1"
                style={{ height: "50vh", paddingLeft: "0px" }}
              >
                <h4 className="ml-1 mr-1 mb-3 info-bold">
                  Locations of Shelters hosting this Breed:
                </h4>
                <MapContainer
                  zoom={6}
                  location_objects={this.state.shelter_list}
                />
              </Col>
            </Row>
          )}
        </Container>
        <Container className="slider-container">
          {dogCards.length > 0 ? (
            <div>
              <InstanceSlider
                title="Adoptable dogs of this breed:"
                cards={dogCards}
              />
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Dogs of this breed: None
            </p>
          )}
          {shelterCards.length > 0 ? (
            <div>
              <InstanceSlider
                title="Shelters that have this breed:"
                cards={shelterCards}
              />
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              {" "}
              Shelters that have this breed: None
            </p>
          )}
          {activityCards.length > 0 ? (
            <div>
              <InstanceSlider
                title="Activities suitable for this breed:"
                cards={activityCards}
              />
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              Activities suitable for this breed: None
            </p>
          )}
        </Container>
      </div>
    );
  }
}
export default BreedInstance;
