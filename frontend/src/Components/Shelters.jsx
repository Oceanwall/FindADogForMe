import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import ShelterCard from "./ShelterCard";
import ShelterInstance from "./ShelterInstance";
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Shelters extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateShelter = this.updateShelter.bind(this);
  }

  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState(state => ({
      info_loaded: false
    }));
    this.updateShelter(pageNum);
  }

  //server request method. called everytime page change, and on initial mount
  async updateShelter(pageNum) {
    wrapper.getShelter(undefined, pageNum).then(response => {
      this.setState(state => ({
        currentPage: pageNum,
        maxPage: response["total_pages"],
        shelterList: response["objects"],
        info_loaded: true
      }));
    });
  }
  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }
  render() {
    if (this.props.match.isExact) {
      let shelterCards = null;
      if (this.state.info_loaded) {
        shelterCards = this.state.shelterList.map(shelter => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <ShelterCard shelter={shelter} />
            </div>
          );
        });
      }
      return (
        <div>
          <div class="text-center mt-2">
            <h1> Shelters</h1>
          </div>
          <Container>
            {this.state.info_loaded && (
              <CardDeck>
                <div class="card-deck">{shelterCards}</div>
              </CardDeck>
            )}
          </Container>
          <PageComp
            currentPage={this.state.currentPage}
            maxPage={this.state.maxPage}
            changePage={this.changePage}
          />
        </div>
      );
    } else {
      return (
        <Route
          path={`${this.props.match.path}/:shelterId`}
          component={ShelterInstance}
        />
      );
    }
  }
}

export default Shelters;
