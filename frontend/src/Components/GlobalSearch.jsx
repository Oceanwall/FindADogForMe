import React, { Component } from "react";
import { CardDeck, Container } from "react-bootstrap";
import { Tabs } from "@yazanaabed/react-tabs";
import PageComp from "./PageComp";
import ShelterCard from "./ShelterCard"
import DogCard from "./DogCard"
import BreedCard from "./BreedCard"
import ActivityCard from "./ActivityCard"
import NotFound from "./NotFound";
import LoadingImage from "./LoadingImage";
import ModelCardDeck from "./ModelCardDeck";

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
          <ModelCardDeck
            info_loaded={this.state.shelters_loaded}
            list={shelterCards}>
          </ModelCardDeck>
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
          <ModelCardDeck
            info_loaded={this.state.dogs_loaded}
            list={dogCards}>
          </ModelCardDeck>
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
          <ModelCardDeck
            info_loaded={this.state.breeds_loaded}
            list={breedCards}>
          </ModelCardDeck>
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
          <ModelCardDeck
            info_loaded={this.state.activities_loaded}
            list={activityCards}>
          </ModelCardDeck>
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
