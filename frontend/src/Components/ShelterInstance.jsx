import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import DogCard from "./DogCard";
import ActivityCard from "./ActivityCard";
import BreedCard from "./BreedCard";
import CardDeck from "react-bootstrap/CardDeck";
import "../styles/Instance.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class ShelterInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelterId: props.match.params.shelterId,
      address: "",
      city: "",
      name: "",
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
          state: shelter["state"]
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
              <div class="info-text">
                <p align="left"> Contact Information: {phone_number}</p>
                <p align="left"> Address: {this.state.address} </p>
                <p align="left">
                  Location: {this.state.city}, {this.state.state}
                </p>
                {breeds.length > 0 ? (
                  <div>
                    <p align="left" className="capitalize">
                      {" "}
                      Shelter Breeds: {" " + breeds}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p align="left"> Shelter Breeds: None listed</p>
                  </div>
                )}
              </div>
            </Col>
            <Col>
              <InstanceCarousel images={this.state.images} />
            </Col>
          </Row>
        </Container>
        <Container>
          {dogCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                {" "}
                Dogs:{" "}
              </p>
              ,
              <CardDeck>
                <div class="card-deck">{dogCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              {" "}
              Dogs: None
            </p>
          )}
          {breedCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                {" "}
                Breeds:{" "}
              </p>
              <CardDeck>
                <div class="card-deck">{breedCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              {" "}
              Breeds: None
            </p>
          )}
          {activityCards.length > 0 ? (
            <div>
              <p align="left" class="deck-title-text">
                {" "}
                Activities:{" "}
              </p>
              <CardDeck>
                <div class="card-deck">{activityCards}</div>
              </CardDeck>
            </div>
          ) : (
            <p align="left" class="deck-title-text">
              {" "}
              Activities: None
            </p>
          )}
        </Container>
      </div>
    );
  }
}
export default ShelterInstance;
