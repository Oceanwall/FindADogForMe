import React, { Component } from "react";
import { Row, Col, CardDeck, Container } from "react-bootstrap";
import { Tabs, TabProvider } from "@yazanaabed/react-tabs";
import PageComp from "./PageComp";
import Shelters from "./Shelters"
import ShelterCard from "./ShelterCard"
import Dogs from "./Dogs"
import DogCard from "./DogCard"
import Breeds from "./Breeds"
import BreedCard from "./BreedCard"
import Activities from "./Activities"
import ActivityCard from "./ActivityCard"
import { Route } from "react-router-dom";
import NotFound from "./NotFound";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class GlobalSearch extends Component {
  constructor(props) {
    super(props);
    this.shelterChangePage = this.shelterChangePage.bind(this);
    this.dogChangePage = this.dogChangePage.bind(this);
    this.breedChangePage = this.breedChangePage.bind(this);
    this.activityChangePage = this.activityChangePage.bind(this);
    this.state = {
      shelters_loaded: false,
      dogs_loaded: false,
      searchParam: this.props.match.params.id,
    };
  }

  async componentDidMount() {
    this.updateShelter(1);
    this.updateDog(1);
    this.updateBreed(1);
    this.updateActivity(1);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log(this.props.location.pathname, prevProps.location.pathname)
      this.setState({
        searchParam: this.props.match.params.id,
      }, () => {
        this.shelterChangePage(1);
        this.dogChangePage(1);
        this.breedChangePage(1);
        this.activityChangePage(1);
      });
    }
  }

  shelterChangePage(pageNum) {
    this.setState({
      shelters_loaded: false,
    });
    this.updateShelter(pageNum);
  }

  dogChangePage(pageNum) {
    this.setState({
      dogs_loaded: false,
    });
    this.updateDog(pageNum);
  }

  breedChangePage(pageNum) {
    this.setState({
      breeds_loaded: false,
    });
    this.updateBreed(pageNum);
  }

  activityChangePage(pageNum) {
    this.setState({
      activities_loaded: false,
    });
    this.updateActivity(pageNum);
  }

  async updateShelter(pageNum) {
    wrapper.getShelterQuery(
      "",
      "",
      "",
      this.state.searchParam,
      undefined,
      pageNum,
    ).then(response => {
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
      pageNum,
      true,
    ).then(response => {
      console.log(response);
      this.setState({
        dogs_loaded: true,
        dogList: response["objects"],
        dogCurrentPage: pageNum,
        dogMaxPage: response["total_pages"],
      });
    });
  }

  async updateBreed(pageNum) {
    wrapper.getBreedQuery(
      undefined,
      undefined,
      undefined,
      this.state.searchParam,
      undefined,
      pageNum,
    ).then(response => {
      console.log(response);
      this.setState({
        breedList: response["objects"],
        breedMaxPage:
          Math.floor(response["num_results"] / 20) +
          (response["num_results"] % 20 ? 1 : 0),
        breeds_loaded: true,
        breedCurrentPage: pageNum,
      });
    });
  }

  async updateActivity(pageNum) {
    wrapper.getActivityQuery(
      undefined,
      undefined,
      "",
      this.state.searchParam,
      undefined,
      pageNum,
      true,
    ).then(response => {
      console.log(response);
      this.setState({
        activityList: response["objects"],
        activityCurrentPage: pageNum,
        activityMaxPage: response["total_pages"],
        activities_loaded: true,
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

    let breedCards = [];
    if (this.state.breeds_loaded) {
      let start = (this.state.breedCurrentPage - 1) * 20;
      let end =
        start + 20 < this.state.breedList.length
          ? start + 20
          : this.state.breedList.length;
      breedCards = this.state.breedList.slice(start, end).map(breed => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <BreedCard breed={breed} highlight={this.state.searchParam}/>
          </div>
        );
      });
    }

    let activityCards = null;
    if (this.state.activities_loaded) {
      activityCards = this.state.activityList.map(activity => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <ActivityCard activity={activity} highlight={this.state.searchParam} />
          </div>
        );
      });
    }

    let shelters = (
      <div>
        <Container>
          {this.state.shelters_loaded && (
            this.state.shelterList.length > 0 ? (
            <CardDeck>
              <div class="card-deck">{shelterCards}</div>
            </CardDeck>
            ) : (
              <NotFound/>
            )
          )}
        </Container>
        <PageComp
          currentPage={this.state.shelterCurrentPage}
          maxPage={this.state.shelterMaxPage}
          changePage={this.shelterChangePage}
        />
      </div>
    );

    let dogs = (
      <div>
        <Container>
          {this.state.dogs_loaded && (
            this.state.dogList.length > 0 ? (
            <CardDeck>
              <div class="card-deck">{dogCards}</div>
            </CardDeck>
            ) : (
              <NotFound/>
            )
          )}
        </Container>
        <PageComp
          currentPage={this.state.dogCurrentPage}
          maxPage={this.state.dogMaxPage}
          changePage={this.dogChangePage}
        />
      </div>
    );

    let breeds = (
      <div>
        <Container>
          {this.state.breeds_loaded && (
            this.state.breedList.length > 0 ? (
            <CardDeck>
              <div class="card-deck">{breedCards}</div>
            </CardDeck>
            ) : (
              <NotFound></NotFound>
            )
          )}
        </Container>
        <PageComp
          currentPage={this.state.breedCurrentPage}
          maxPage={this.state.breedMaxPage}
          changePage={this.breedChangePage}
        />
      </div>
    )

    let activities = (
      <div>
        <Container>
          {this.state.activities_loaded && (
            this.state.activityList.length > 0 ? (
            <CardDeck>
              <div class="card-deck">{activityCards}</div>
            </CardDeck>
            ) : (
              <NotFound/>
            )
          )}
        </Container>
        <PageComp
          currentPage={this.state.activityCurrentPage}
          maxPage={this.state.activityMaxPage}
          changePage={this.activityChangePage}
        />
      </div>
    )

    return (
      <div class="text-center mt-3">
        <h1>
          Search Results for: {this.props.match.params.id}
        </h1>

        <Tabs
          activeTab={{
            id: "tab1"
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
          <Tabs.Tab
            id="tab3"
            title="Breeds"
          >
            {breeds}
          </Tabs.Tab>
          <Tabs.Tab
            id="tab4"
            title="Activities"
          >
            {activities}
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default GlobalSearch;
