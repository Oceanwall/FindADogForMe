import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import BreedCard from "./BreedCard";
import BreedInstance from "./BreedInstance";
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Breeds extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      currentPage: 1,
      info_loaded: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateDog = this.updateBreed.bind(this);
  }
  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState(state => ({
      currentPage: pageNum
    }));
  }

  //server request method. called everytime page change, and on initial mount
  async updateBreed() {
    wrapper.getBreed().then(response => {
      this.setState(state => ({
        maxPage:
          Math.floor(response["num_results"] / 20) +
          (response["num_results"] % 20 ? 1 : 0),
        breedList: response["objects"],
        info_loaded: true
      }));
    });
  }
  async componentDidMount() {
    this.updateBreed();
  }
  render() {
    if (this.props.match.isExact) {
      let breedCards = [];
      if (this.state.info_loaded) {
        let start = (this.state.currentPage - 1) * 20;
        let end =
          start + 20 < this.state.breedList.length
            ? start + 20
            : this.state.breedList.length;
        breedCards = this.state.breedList.slice(start, end).map(breed => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <BreedCard breed={breed} />
            </div>
          );
        });
      }
      return (
        <div>
          <div class="text-center mt-2">
            <h1> Breeds</h1>
          </div>
          <Container>
            {this.state.info_loaded && (
              <CardDeck>
                <div class="card-deck">{breedCards}</div>
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
          path={`${this.props.match.path}/:breedId`}
          component={BreedInstance}
        />
      );
    }
  }
}

export default Breeds;
