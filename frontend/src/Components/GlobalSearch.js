import React, { Component } from "react";
import { Row, Col, CardDeck, Container } from "react-bootstrap";
import { Tabs, TabProvider } from "react-tabs";
import PageComp from "./PageComp";
import Shelters from "./Shelters"
import ShelterCard from "./ShelterCard"
import Dogs from "./Dogs"
import DogCard from "./DogCard"
import Breeds from "./Breeds"
import Activities from "./Activities"
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class GlobalSearch extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changePage = this.changePage.bind(this);
    this.tabRef = React.createRef();
    this.state = {
      shelters_loaded: false,
      dogs_loaded: false,
      searchParam: this.props.match.params.id,
      activeTabIndex: "tab1",
    };
  }

  async componentDidMount() {
    this.updateShelter(1);
    this.updateDog(1);
  }

  async toggle(tabIndex) {
    this.setState({
      activeTabIndex: tabIndex,
    });
  }

  changePage(pageNum) {
    console.log('AGAHSIFJ', pageNum, this.tabRef)
    switch(this.tabRef.props.activeTab.id) {
      case "tab1":
        this.setState({
          shelters_loaded: false,
        });
        this.updateShelter(pageNum);
        break;
      case "tab2":
        this.setState({
          dogs_loaded: false,
        });
        this.updateDog(pageNum);
        break;
    }
  }

  async updateShelter(pageNum) {
    wrapper.getShelterQuery(
      "",
      "",
      "",
      this.state.searchParam,
      undefined,
      pageNum,
    )
    .then(response => {
      console.log(response);
      this.setState({
        shelters_loaded: true,
        shelterList: response["objects"],
        shelterCurrentPage: pageNum,
        shelterMaxPage: response["total_pages"],
      });
    });
  }

  async updateDog(pageNum) {
    wrapper.getDogQuery(
      "",
      "",
      "",
      this.state.searchParam,
      undefined,
      pageNum
    )
    .then(response => {
      console.log(response);
      this.setState({
        dogs_loaded: true,
        dogList: response["objects"],
        dogCurrentPage: pageNum,
        dogMaxPage: response["total_pages"],
      });
    });
  }

  render() {
    let shelterCards = null;
    if (this.state.shelters_loaded) {
      shelterCards = this.state.shelterList.map(shelter => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <ShelterCard shelter={shelter} highlight={this.state.searchParam}/>
          </div>
        );
      });
    }

    let dogCards = null;
    if (this.state.dogs_loaded) {
      dogCards = this.state.dogList.map(dog => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <DogCard dog={dog} key={dog.name} highlight={this.state.searchParam}/>
          </div>
        );
      });
    }

    let shelters = (
      <div>
        <Container>
          {this.state.shelters_loaded && (
            <CardDeck>
              <div class="card-deck">{shelterCards}</div>
            </CardDeck>
          )}
        </Container>
        <PageComp
          currentPage={this.state.shelterCurrentPage}
          maxPage={this.state.shelterMaxPage}
          changePage={this.changePage}
        />
      </div>
    );

    let dogs = (
      <div>
        <Container>
          {this.state.dogs_loaded && (
            <CardDeck>
              <div class="card-deck">{dogCards}</div>
            </CardDeck>
          )}
        </Container>
        <PageComp
          currentPage={this.state.dogCurrentPage}
          maxPage={this.state.dogMaxPage}
          changePage={this.changePage}
        />
      </div>
    );

    return (
      <div class="text-center mt-2">
        <h1>
          Search Results for: {this.props.match.params.id}
        </h1>

        <Tabs
          activeTab={{
            id: "tab2"
          }}
          ref={ref => {
            this.tabRef = ref;
          }}
        >
          <Tabs.Tab
            id="tab1"
            title="Shelters"
          >
            {shelters}
          </Tabs.Tab>
          <Tabs.Tab
            id="tab2"
            title="Dogs"
          >
            {dogs}
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default GlobalSearch;
