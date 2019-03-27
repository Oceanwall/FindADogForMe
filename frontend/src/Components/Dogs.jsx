import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import DogCard from "./DogCard";
import DogInstance from "./DogInstance"
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Dogs extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateDog = this.updateDog.bind(this);
  }

  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState(state => ({
      info_loaded: false
    }));
    this.updateDog(pageNum);
  }

  //server request method. called everytime page change, and on initial mount
  async updateDog(pageNum) {
    wrapper.getDog(undefined, pageNum).then((response) => {
      this.setState(state => ({
        currentPage: pageNum,
        maxPage: response["total_pages"],
        dogList: response["objects"],
        info_loaded: true
      }));
    });
  }
  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }

  render() {
    if(this.props.match.isExact) {
      let dogCards = null;
      if(this.state.info_loaded) {
          dogCards = this.state.dogList.map(dog => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <DogCard dog={dog}/>
            </div>
          );
        });
      }
      return (
          <div>
            <div class="text-center">
              <h1> Dogs</h1>
            </div>
            <Container>
              {this.state.info_loaded && 
                <CardDeck>
                  <div class="card-deck">{dogCards}</div>
                </CardDeck>
              }
            </Container>
            <PageComp
              currentPage={this.state.currentPage}
              maxPage={this.state.maxPage}
              changePage={this.changePage}
            />
          </div>
      );
    }
    else {
      return (<Route path={`${this.props.match.path}/:dogId`} component={DogInstance} />);
    }
  }
}

export default Dogs;
