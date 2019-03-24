import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import DogCard from "./DogCard";


class Dogs extends Component {
  constructor(props) {
    super(props);
    //dogs = getDog
    this.state = {
      //I'm going to be given an object with an api call through getDog
      //getDog generically should return an object with objects, total_pages, and page
      currentPage: 1,
      maxPage: 10, //dogs["total_pages"]
      dogList: [] //dogs["objects"]. Array of 12 objects
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(pageNum) {
    this.setState(state => ({
      currentPage: pageNum
    }));
  }
  render() {
    let dogCards = this.state.dogList.map(dog => { //add shelter prop from shelterid?
      return (
        <div class="col-md-4 offset-md-0 col-10 offset-1">
          <DogCard dog={dog} />
        </div>
      );
    });
    return (
      <div>
        <div class="text-center">
          <h1> Dogs</h1>
        </div>
        <Container>
          <CardDeck>
            <div class="card-deck">{dogCards}</div>
          </CardDeck>
        </Container>
        <PageComp
          currentPage={this.state.currentPage}
          maxPage={this.state.maxPage}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default Dogs;
