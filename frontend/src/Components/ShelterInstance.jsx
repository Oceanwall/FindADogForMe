import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import DogCard from "./DogCard";
import ActivityCard from "./ActivityCard";
import BreedCard from "./BreedCard";
import "../styles/Instance.css";
import MapContainer from "./Map";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import InstanceSlider from "./InstanceSlider";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class ShelterInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelterId: props.match.params.shelterId,
      address: "",
      city: "",
      name: "",
      latitude: undefined,
      longitude: undefined,
      phone: "",
      state: "",
      dog_list: [],
      activity_list: [],
      breed_list: [],
      images: [],
      loaded: false
    };
  }

  async updateShelter() {
    wrapper.getShelter(this.state.shelterId).then(response => {
      console.log(response);
      let shelter = response;
      this.setState(
        {
          address: shelter["address"],
          city: shelter["city"],
          name: shelter["name"],
          phone: shelter["phone"],
          state: shelter["state"],
          latitude: shelter["latitude"],
          longitude: shelter["longitude"]
        },
        () =>
          wrapper.getShelterBreeds(this.state.shelterId).then(response => {
            console.log(response);
            this.setState(
              {
                breed_list: response
              },
              () =>
                wrapper.getShelterDogs(this.state.shelterId).then(response => {
                  console.log(response);
                  this.setState(
                    {
                      dog_list: response["objects"]
                    },
                    () =>
                      wrapper
                        .getShelterActivities(this.state.shelterId)
                        .then(response => {
                          console.log(response);
                          this.setState(
                            {
                              activity_list: response["objects"]
                            },
                            () => this.loadImages()
                          );
                        })
                  );
                })
            );
          })
      );
    });
  }

  loadImages() {
    let imageArray = [];
    for (let i = 0; i < this.state.dog_list.length; i++) {
      let dog = this.state.dog_list[i];
      if (dog["image_1"] != null) {
        imageArray.push(dog["image_1"]);
      }
      if (dog["image_2"] != null) {
        imageArray.push(dog["image_2"]);
      }
      if (dog["image_3"] != null) {
        imageArray.push(dog["image_3"]);
      }
      if (dog["image_4"] != null) {
        imageArray.push(dog["image_4"]);
      }
    }
    console.log(imageArray);
    this.setState({ images: imageArray, loaded: true });
  }

  async componentDidMount() {
    this.updateShelter();
  }

  render() {
    let dogCards = [];
    if (this.state.loaded) {
      dogCards = this.state.dog_list.map(dog => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <DogCard dog={dog} />
          </div>
        );
      });
    }
    let breedCards = [];
    if (this.state.loaded) {
      breedCards = this.state.breed_list.map(breed => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <BreedCard breed={breed} />
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

    let breeds = [];
    if (this.state.loaded) {
      console.log(this.state.breed_list);
      breeds = this.state.breed_list.map(breed => {
        return " " + breed["name"];
      });
    }

    let phone_number = parsePhoneNumberFromString("+1" + this.state.phone);
    if (!phone_number) phone_number = this.state.phone;
    else phone_number = phone_number.formatNational();

    return (
      <div>
        <Container>
          <br />
          <Row>
            <Col>
              <h1> {this.state.name}</h1>
              <div className="mt-4 info-text">
                <p align="left">
                  {" "}
                  <span className="info-bold">Contact Information:</span>{" "}
                  {phone_number}
                </p>
                <p align="left">
                  {" "}
                  <span className="info-bold">Address:</span>{" "}
                  {this.state.address}{" "}
                </p>
                <p align="left">
                  <span className="info-bold">Location:</span> {this.state.city}
                  , {this.state.state}
                </p>
                {breeds.length > 0 ? (
                  <div>
                    <p align="left" className="capitalize">
                      {" "}
                      <span className="info-bold">Shelter Breeds:</span>{" "}
                      {" " + breeds}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p align="left">
                      {" "}
                      <span className="info-bold">Shelter Breeds:</span> None
                      listed
                    </p>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={12} md={7} lg={6}>
              <InstanceCarousel images={this.state.images} />
            </Col>
          </Row>

          {this.state.latitude && (
            <Row>
              <Col
                xs={12}
                className="mt-2 mb-1"
                id="google-map"
                style={{ height: "50vh", paddingLeft: "0px" }}
              >
                <h4 className="ml-1 mr-1 mb-3 info-bold">
                  Location of Shelter:
                </h4>
                <MapContainer
                  location_objects={[
                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                      name: this.state.name
                    }
                  ]}
                />
              </Col>
            </Row>
          )}
        </Container>

        <Container className="slider-container">
          {dogCards.length > 0 ? (
            <InstanceSlider title="Dogs in this shelter:" cards={dogCards} />
          ) : (
            <p align="left" class="deck-title-text">
              Dogs in this shelter: None
            </p>
          )}
          {breedCards.length > 0 ? (
            <InstanceSlider
              title="Breeds in this shelter:"
              cards={breedCards}
            />
          ) : (
            <p align="left" class="deck-title-text">
              Breeds in this shelter: None
            </p>
          )}
          {activityCards.length > 0 ? (
            <InstanceSlider
              title="Activities near this shelter:"
              cards={activityCards}
            />
          ) : (
            <p align="left" class="deck-title-text">
              Activities near this shelter: None
            </p>
          )}
        </Container>
      </div>
    );
  }
}
export default ShelterInstance;
