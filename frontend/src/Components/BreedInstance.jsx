import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InstanceCarousel from "./InstanceCarousel";
import DogCard from "./DogCard";
import ActivityCard from "./ActivityCard";
import ShelterCard from "./ShelterCard";
import CardDeck from "react-bootstrap/CardDeck";

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
      console.log(response);
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
        () =>
          wrapper.getBreedShelters(this.state.name).then(response => {
            console.log(response);
            this.setState(
              {
                shelter_list: response["objects"]
              },
              () =>
                wrapper
                  .getBreedDogs(this.state.name, undefined)
                  .then(response => {
                    console.log(response);
                    this.setState(
                      {
                        dog_list: response["objects"]
                      },
                      () =>
                        wrapper
                          .getBreedActivities(this.state.name)
                          .then(response => {
                            console.log(response);
                            this.setState({
                              activity_list: response["objects"]
                            });
                          })
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
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
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
        <div>
          <Container>
            <Row>
              <Col>
                <h1> {this.state.name}</h1>
                <div class="dog-info-text">
                  <p align="left"> Group: {this.state.group}</p>
                  <p align="left"> Temperament: {this.state.temperament}</p>
                  <p align="left">
                    {" "}
                    Lifespan: {this.state.min_lifespan}-
                    {this.state.max_lifespan}
                  </p>
                  <p align="left">
                    {" "}
                    Height: {this.state.min_height}-{this.state.max_height}{" "}
                    inches
                  </p>
                </div>
              </Col>
              <Col>
                <InstanceCarousel images={this.state.images} />
              </Col>
            </Row>
          </Container>
          <Container>
            {dogCards.length > 0 ? (
              (<p align="left"> Dogs: </p>,
              (
                <CardDeck>
                  <div class="card-deck">{dogCards}</div>
                </CardDeck>
              ))
            ) : (
              <p align="left"> Dogs: None</p>
            )}
            {shelterCards.length > 0 ? (
              (<p align="left"> Shelters: </p>,
              (
                <CardDeck>
                  <div class="card-deck">{shelterCards}</div>
                </CardDeck>
              ))
            ) : (
              <p align="left"> Shelters: None</p>
            )}
            {activityCards.length > 0 ? (
              (<p align="left"> Activities: </p>,
              (
                <CardDeck>
                  <div class="card-deck">{activityCards}</div>
                </CardDeck>
              ))
            ) : (
              <p align="left"> Activities: None</p>
            )}
          </Container>
        </div>
      </div>
    );
  }
}
export default BreedInstance;
