import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import BreedCard from "./BreedCard";
import BreedInstance from "./BreedInstance";
import { Route } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import {
  VALID_GROUPS,
  VALID_LIFESPANS,
  VALID_HEIGHTS
} from "../valid_options.jsx";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Breeds extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      currentPage: 1,
      info_loaded: false,
      group: undefined,
      lifespan: undefined,
      height: undefined,
      groupButtonName: "Filter by group",
      freeButtonName: "Filter by cost",
      typeButtonName: "Filter by type",
      sortButtonName: "Sort",
      searchParam: undefined,
      sortParam: undefined,
      filtered: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateBreed = this.updateBreed.bind(this);
    this.setSort = this.setSort.bind(this);
    this.setGroupFilter = this.setGroupFilter.bind(this);
    this.setLifespanFilter = this.setLifespanFilter.bind(this);
    this.setHeightFilter = this.setHeightFilter.bind(this);
    this.modelSearch = this.modelSearch.bind(this);
    this.reset = this.reset.bind(this);
    this.checkFiltered = this.checkFiltered.bind(this);

    this.groupRef = React.createRef();
    this.lifespanRef = React.createRef();
    this.heightRef = React.createRef();
    this.searchParamRef = React.createRef();
  }

  //change page. pretty much copy paste this around
  changePage(pageNum) {
    this.setState(state => ({
      currentPage: pageNum,
      info_loaded: false
    }));
    this.updateBreed();
  }

  //server request method. called everytime page change, and on initial mount
  async updateBreed() {
    console.log("Filtered:", this.state.filtered);
    if (!this.state.filtered) {
      wrapper.getBreed().then(response => {
        this.setState(state => ({
          maxPage:
            Math.floor(response["num_results"] / 20) +
            (response["num_results"] % 20 ? 1 : 0),
          breedList: response["objects"],
          info_loaded: true
        }));
      });
    } else {
      wrapper
        .getBreedQuery(
          this.state.group,
          this.state.lifespan,
          this.state.height,
          this.state.searchParam,
          this.state.sortParam,
          this.state.currentPage
        )
        .then(response => {
          console.log(response);
          this.setState({
            breedList: response["objects"],
            maxPage:
              Math.floor(response["num_results"] / 20) +
              (response["num_results"] % 20 ? 1 : 0),
            info_loaded: true
          });
        });
    }
  }

  async componentDidMount() {
    this.changePage(1);
  }

  filter() {
    let filter = this.checkFiltered();
    console.log("Filtered: ", filter);
    wrapper
      .getBreedQuery(
        this.state.group,
        this.state.lifespan,
        this.state.height,
        this.state.searchParam,
        this.state.sortParam
      )
      .then(response => {
        console.log(response);
        this.setState({
          breedList: response["objects"],
          maxPage:
            Math.floor(response["num_results"] / 20) +
            (response["num_results"] % 20 ? 1 : 0),
          filtered: filter,
          info_loaded: true,
          currentPage: 1
        });
      });
  }

  setGroupFilter(group) {
    console.log("Group:", group);
    if (group.length == 0) group = undefined;
    this.setState({ group: group, groupButtonName: group }, () =>
      this.filter()
    );
  }

  setLifespanFilter(lifespan) {
    if (lifespan.length == 0) lifespan = undefined;
    this.setState({ lifespan: lifespan, lifespanButtonName: lifespan }, () =>
      this.filter()
    );
  }

  setHeightFilter(height) {
    if (height.length == 0) height = undefined;
    this.setState({ height: height, heightButtonName: height }, () =>
      this.filter()
    );
  }

  setSort(sort, label) {
    this.setState({ sortParam: sort, sortButtonName: label }, () => {
      this.filter();
    });
  }

  modelSearch() {
    this.setState(
      {
        searchParam: this.searchParamRef.value
      },
      this.filter()
    );
  }

  // return true if filtered, false otherwise
  checkFiltered() {
    return (
      this.state.group != undefined ||
      this.state.lifespan != undefined ||
      this.state.height != undefined ||
      this.state.sortParam != undefined ||
      this.state.searchParam != undefined
    );
  }

  reset() {
    this.setState(
      {
        group: undefined,
        lifespan: undefined,
        height: undefined,
        groupButtonName: "Filter by group",
        freeButtonName: "Filter by cost",
        typeButtonName: "Filter by type",
        sortButtonName: "Sort",
        searchParam: undefined,
        sortParam: undefined,
        filtered: false
      },
      () => this.updateBreed(1)
    );

    this.groupRef.getInstance().clear();
    this.lifespanRef.getInstance().clear();
    this.heightRef.getInstance().clear();
    this.searchParamRef.value = "";
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
              <BreedCard breed={breed} highlight={this.state.searchParam}/>
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
            <Form>
              <Row className="mt-2">
                <Col md={1} xs={2} className="mt-2">
                  <Button variant="danger" onClick={() => this.reset()}>
                    Reset
                  </Button>
                </Col>

                <Col md={2} xs={4} className="mt-2">
                  <DropdownButton title={this.state.sortButtonName}>
                    <Dropdown.Item
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
                      eventKey="Ascending group"
                      onSelect={eventKey => this.setSort("group", eventKey)}
                    >
                      Ascending group
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Descending group"
                      onSelect={eventKey =>
                        this.setSort("reverse_group", eventKey)
                      }
                    >
                      Descending group
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Typeahead
                    id="group-select"
                    clearButton
                    placeholder="Filter by group..."
                    selectHintOnEnter={true}
                    ref={ref => {
                      this.groupRef = ref;
                    }}
                    onChange={group => this.setGroupFilter(group)}
                    options={VALID_GROUPS}
                  />
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Typeahead
                    id="lifespan-select"
                    clearButton
                    placeholder="Filter by lifespan..."
                    selectHintOnEnter={true}
                    ref={ref => {
                      this.lifespanRef = ref;
                    }}
                    onChange={lifespan => this.setLifespanFilter(lifespan)}
                    options={VALID_LIFESPANS}
                  />
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Typeahead
                    id="height-select"
                    clearButton
                    placeholder="Filter by height..."
                    selectHintOnEnter={true}
                    ref={ref => {
                      this.heightRef = ref;
                    }}
                    onChange={height => this.setHeightFilter(height)}
                    options={VALID_HEIGHTS}
                  />
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Form.Control
                    id="breed-search"
                    type="text"
                    ref={ref => {
                      this.searchParamRef = ref;
                    }}
                    clearButton
                    placeholder="Search for a specific breed..."
                  />
                </Col>

                <Col md={1} xs={6} className="mt-2">
                  <Button onClick={this.modelSearch}>Search</Button>
                </Col>
              </Row>
            </Form>
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
