import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import ActivityCard from "./ActivityCard";
import ActivityInstance from "./ActivityInstance";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Activities extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false,
      active: undefined,
      free: undefined,
      type: "",
      activeButtonName: "Filter by intensity",
      freeButtonName: "Filter by cost",
      typeButtonName: "Filter by type",
      sortButtonName: "Sort",
      searchParam: undefined,
      sortParam: undefined,
      filtered: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateDog = this.updateActivity.bind(this);
  }

  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState(state => ({
      info_loaded: false
    }));
    this.updateActivity(pageNum);
  }

  //server request method. called everytime page change, and on initial mount
  async updateActivity(pageNum) {
    if (!this.state.filtered) {
      wrapper.getActivity(undefined, pageNum).then(response => {
        this.setState({
          currentPage: pageNum,
          maxPage: response["total_pages"],
          activityList: response["objects"],
          info_loaded: true
        });
      });
    } else {
      wrapper
        .getActivityQuery(
          this.state.active,
          this.state.free,
          this.state.type,
          this.state.searchParam,
          this.state.sortParam,
          pageNum
        )
        .then(response => {
          console.log(response);
          this.setState({
            activityList: response["objects"],
            currentPage: pageNum,
            maxPage: response["total_pages"],
            info_loaded: true
          });
        });
    }
  }

  // sets sort criteria then updates the dogs to show
  setSort(sort, label) {
    this.setState({ sortParam: sort, sortButtonName: label }, () => {
      wrapper
        .getActivityQuery(
          this.state.active,
          this.state.free,
          this.state.type,
          this.state.searchParam,
          this.state.sortParam
        )
        .then(response => {
          console.log(response);
          this.setState({ activityList: response["objects"], filtered: true });
        });
    });
  }

  setActiveFilter(active, label) {
    this.setState({ active: active, activeButtonName: label }, () => {
      wrapper
        .getActivityQuery(
          this.state.active,
          this.state.free,
          this.state.type,
          this.state.searchParam,
          this.state.sortParam
        )
        .then(response => {
          console.log(response);
          this.setState({ activityList: response["objects"], filtered: true });
        });
    });
  }

  setFreeFilter(free, label) {
    this.setState({ free: free, freeButtonName: label }, () => {
      wrapper
        .getActivityQuery(
          this.state.active,
          this.state.free,
          this.state.type,
          this.state.searchParam,
          this.state.sortParam
        )
        .then(response => {
          console.log(response);
          this.setState({ activityList: response["objects"], filtered: true });
        });
    });
  }

  setTypeFilter(type, label) {
    this.setState({ type: type, typeButtonName: label }, () => {
      wrapper
        .getActivityQuery(
          this.state.active,
          this.state.free,
          this.state.type,
          this.state.searchParam,
          this.state.sortParam
        )
        .then(response => {
          console.log(response);
          this.setState({ activityList: response["objects"], filtered: true });
        });
    });
  }

  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }

  render() {
    if (this.props.match.isExact) {
      let activityCards = null;
      if (this.state.info_loaded) {
        activityCards = this.state.activityList.map(activity => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <ActivityCard activity={activity} />
            </div>
          );
        });
        console.log(this.state.activityList);
      }
      return (
        <div>
          <div class="text-center mt-2">
            <h1> Activities</h1>
          </div>
          <Container>
            <Row className="search-bar">
              <Button
                variant="danger"
                onClick={() =>
                  this.setState(
                    {
                      age: "",
                      breed: "",
                      size: "",
                      activeButtonName: "Filter by intensity",
                      freeButtonName: "Filter by cost",
                      typeButtonName: "Filter by type",
                      filtered: false
                    },
                    () => this.updateDog(1)
                  )
                }
              >
                Reset
              </Button>

              <DropdownButton title={this.state.sortButtonName}>
                <Dropdown.Item
                  eventKey="A-Z"
                  onSelect={eventKey => this.setSort("alphabetical", eventKey)}
                >
                  A-Z
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Z-A"
                  onSelect={eventKey =>
                    this.setSort("reverse_alphabetical", eventKey)
                  }
                >
                  Z-A
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Chronological"
                  onSelect={eventKey => this.setSort("date", eventKey)}
                >
                  Chronological
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Reverse Chronological"
                  onSelect={eventKey => this.setSort("reverse_date", eventKey)}
                >
                  Reverse Chronological
                </Dropdown.Item>
              </DropdownButton>

              <DropdownButton title={this.state.activeButtonName}>
                <Dropdown.Item
                  eventKey="Active"
                  onSelect={eventKey => this.setActiveFilter(true, eventKey)}
                >
                  Active
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Casual"
                  onSelect={eventKey => this.setActiveFilter(false, eventKey)}
                >
                  Casual
                </Dropdown.Item>
              </DropdownButton>

              <DropdownButton title={this.state.freeButtonName}>
                <Dropdown.Item
                  eventKey="Free"
                  onSelect={eventKey => this.setFreeFilter(true, eventKey)}
                >
                  Free
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Paid"
                  onSelect={eventKey => this.setFreeFilter(false, eventKey)}
                >
                  Paid
                </Dropdown.Item>
              </DropdownButton>

              <DropdownButton title={this.state.typeButtonName}>
                <Dropdown.Item
                  eventKey="Eventbrite"
                  onSelect={eventKey =>
                    this.setTypeFilter("eventbrite", eventKey)
                  }
                >
                  Eventbrite
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Meetup"
                  onSelect={eventKey => this.setTypeFilter("meetup", eventKey)}
                >
                  Meetup
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="National Park"
                  onSelect={eventKey => this.setTypeFilter("park", eventKey)}
                >
                  National Park
                </Dropdown.Item>
              </DropdownButton>

              <Button>Search</Button>
            </Row>
            {this.state.info_loaded && (
              <CardDeck>
                <div class="card-deck">{activityCards}</div>
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
          path={`${this.props.match.path}/:activityId`}
          component={ActivityInstance}
        />
      );
    }
  }
}

export default Activities;
