import React, { Component } from "react";
import PageComp from "./PageComp";
import Container from "react-bootstrap/Container";
import ActivityInstance from "./ActivityInstance";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Route } from "react-router-dom";
import "../styles/DropdownButton.css";
import ModelCardDeck from "./ModelCardDeck";
import { timingSafeEqual } from "crypto";

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
      activeButtonName: "Filter by action",
      freeButtonName: "Filter by cost",
      typeButtonName: "Filter by type",
      sortButtonName: "Sort",
      searchParam: undefined,
      sortParam: undefined,
      filtered: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateDog = this.updateActivity.bind(this);
    this.filter = this.filter.bind(this);
    this.modelSearch = this.modelSearch.bind(this);
    this.checkFiltered = this.checkFiltered.bind(this);
    this.reset = this.reset.bind(this);

    this.searchParamRef = React.createRef();
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
      this.filter(pageNum);
    }
  }

  filter(pageNum = 1) {
    let filter = this.checkFiltered();
    wrapper
      .getActivityQuery(
        this.state.active,
        this.state.free,
        this.state.type,
        this.state.searchParam,
        this.state.sortParam
      )
      .then(response => {
        this.setState({
          activityList: response["objects"],
          maxPage: response["total_pages"],
          info_loaded: true,
          currentPage: pageNum,
          filtered: filter
        });
      });
  }

  // sets sort criteria then updates the dogs to show
  setSort(sort, label) {
    this.setState(
      { sortParam: sort, sortButtonName: label, filtered: true },
      () => this.filter()
    );
  }

  setActiveFilter(active, label) {
    this.setState(
      { active: active, activeButtonName: label, filtered: true },
      () => this.filter()
    );
  }

  setFreeFilter(free, label) {
    this.setState({ free: free, freeButtonName: label, filtered: true }, () =>
      this.filter()
    );
  }

  setTypeFilter(type, label) {
    this.setState({ type: type, typeButtonName: label, filtered: true }, () =>
      this.filter()
    );
  }

  checkFiltered() {
    return (
      this.state.active !== undefined ||
      this.state.free !== undefined ||
      this.state.type !== "" ||
      this.state.sortParam !== undefined ||
      this.state.searchParam !== undefined
    );
  }

  modelSearch() {
    this.setState(
      {
        searchParam:
          this.searchParamRef.value.length == 0
            ? undefined
            : this.searchParamRef.value
      },
      () => {
        this.setState({ filtered: this.checkFiltered() }, () => {
          if (this.state.filtered) {
            this.filter();
          } else {
            this.updateActivity(1);
          }
        });
      }
    );
  }

  reset() {
    this.setState(
      {
        activeButtonName: "Filter by intensity",
        freeButtonName: "Filter by cost",
        typeButtonName: "Filter by type",
        sortButtonName: "Sort",
        active: undefined,
        free: undefined,
        type: "",
        filtered: false,
        sortParam: undefined,
        searchParam: undefined
      },
      () => {
        this.updateDog(1);
        this.searchParamRef.value = "";
      }
    );
  }

  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }

  render() {
    if (this.props.match.isExact) {
      return (
        <div>
          <div class="text-center mt-3">
            <h1> Activities</h1>
          </div>
          <Container>
            <Row className="mt-2 justify-content-md-center">
              <Col lg={1} xs={3} className="mt-2">
                <Button
                  id="reset-button"
                  variant="danger"
                  onClick={() => {
                    this.reset();
                  }}
                >
                  Reset
                </Button>
              </Col>

              <Col md="auto" xs={3} className="mt-2">
                <DropdownButton
                  title={this.state.sortButtonName}
                  id="sort-select"
                >
                  <Dropdown.Item
                    className="sort_button_custom"
                    eventKey="A-Z"
                    onSelect={eventKey =>
                      this.setSort("alphabetical", eventKey)
                    }
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
                    onSelect={eventKey =>
                      this.setSort("reverse_date", eventKey)
                    }
                  >
                    Reverse Chronological
                  </Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col md="auto" xs={6} className="mt-2">
                <DropdownButton
                  title={this.state.activeButtonName}
                  id="active-filter"
                >
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
              </Col>

              <Col md="auto" xs={6} className="mt-2">
                <DropdownButton
                  title={this.state.freeButtonName}
                  id="cost-filter"
                >
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
              </Col>

              <Col md="auto" xs={6} className="mt-2">
                <DropdownButton
                  title={this.state.typeButtonName}
                  id="type-filter"
                >
                  <Dropdown.Item
                    eventKey="Event"
                    onSelect={eventKey =>
                      this.setTypeFilter("eventbrite", eventKey)
                    }
                  >
                    Event
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Meetup"
                    onSelect={eventKey =>
                      this.setTypeFilter("meetup", eventKey)
                    }
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
              </Col>

              <Col md="auto" xs={6} className="mt-2">
                <Form.Control
                  id="activity-search"
                  type="text"
                  ref={ref => {
                    this.searchParamRef = ref;
                  }}
                  clearButton
                  placeholder="Search for a specific activity..."
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.modelSearch();
                    }
                  }}
                />
              </Col>

              <Col lg={2} xs={6} className="mt-2">
                <Button onClick={this.modelSearch} id="search-button">
                  Search
                </Button>
              </Col>
            </Row>
            <ModelCardDeck
              info_loaded={this.state.info_loaded}
              activityList={this.state.activityList}
              type="Activities"
              searchParam={this.state.searchParam}
            />
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
