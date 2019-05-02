import React, { Component } from "react";
import PageComp from "./PageComp";
import Container from "react-bootstrap/Container";
import BreedInstance from "./BreedInstance";
import { Route } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import {
  VALID_GROUPS,
  VALID_LIFESPANS,
  VALID_HEIGHTS
} from "../valid_options.jsx";
import "../styles/DropdownButton.css";
import ModelCardDeck from "./ModelCardDeck";

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

  changePage(pageNum) {
    this.setState(
      {
        currentPage: pageNum,
        info_loaded: false
      },
      () => this.updateBreed()
    );
  }

  //server request method. called everytime page change, and on initial mount
  async updateBreed() {
    if (!this.state.filtered) {
      wrapper.getBreed().then(response => {
        this.setState({
          maxPage:
            Math.floor(response["num_results"] / 20) +
            (response["num_results"] % 20 ? 1 : 0),
          breedList: response["objects"],
          info_loaded: true
        });
      });
    } else {
      this.filter(this.state.currentPage);
    }
  }

  async componentDidMount() {
    this.changePage(1);
  }

  filter(pageNum = 1) {
    let filter = this.checkFiltered();
    wrapper
      .getBreedQuery(
        this.state.group,
        this.state.lifespan,
        this.state.height,
        this.state.searchParam,
        this.state.sortParam,
        pageNum
      )
      .then(response => {
        this.setState({
          breedList: response["objects"],
          maxPage:
            Math.floor(response["num_results"] / 20) +
            (response["num_results"] % 20 ? 1 : 0),
          filtered: filter,
          info_loaded: true,
          currentPage: pageNum
        });
      });
  }

  setGroupFilter(group) {
    group = group === null || group.length === 0 ? undefined : group.value;
    this.setState({ group: group, groupButtonName: group }, () =>
      this.filter()
    );
  }

  setLifespanFilter(lifespan) {
    lifespan =
      lifespan === null || lifespan.length === 0 ? undefined : lifespan.value;
    this.setState({ lifespan: lifespan, lifespanButtonName: lifespan }, () =>
      this.filter()
    );
  }

  setHeightFilter(height) {
    height = height === null || height.length === 0 ? undefined : height.value;
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
            this.updateBreed(1);
          }
        });
      }
    );
  }

  // return true if page is filtered, false otherwise
  checkFiltered() {
    return (
      typeof this.state.group !== "undefined" ||
      typeof this.state.lifespan !== "undefined" ||
      typeof this.state.height !== "undefined" ||
      typeof this.state.sortParam !== "undefined" ||
      typeof this.state.searchParam !== "undefined"
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
      () => this.updateBreed()
    );

    this.groupRef.select.clearValue();
    this.lifespanRef.select.clearValue();
    this.heightRef.select.clearValue();
    this.searchParamRef.value = "";
  }

  render() {
    if (this.props.match.isExact) {
      let start = (this.state.currentPage - 1) * 20;
      return (
        <div>
          <div class="text-center mt-3">
            <h1> Breeds</h1>
          </div>
          <Container>
            <Form>
              <Row className="mt-2 justify-content-md-center">
                <Col lg="auto" xs={3} className="mt-2">
                  <Button
                    id="reset-button"
                    variant="danger"
                    onClick={() => this.reset()}
                  >
                    Reset
                  </Button>
                </Col>

                <Col lg="auto" xs={3} className="mt-2">
                  <DropdownButton
                    title={this.state.sortButtonName}
                    id="sort-select"
                  >
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

                <Col lg={3} xs={6} className="mt-2">
                  <Select
                    id="group-filter"
                    isClearable
                    placeholder="Group filter..."
                    ref={ref => {
                      this.groupRef = ref;
                    }}
                    onChange={group => this.setGroupFilter(group)}
                    options={VALID_GROUPS}
                  />
                </Col>

                <Col lg={3} xs={6} className="mt-2">
                  <Select
                    id="lifespan-filter"
                    isClearable
                    placeholder="Lifespan filter..."
                    ref={ref => {
                      this.lifespanRef = ref;
                    }}
                    onChange={lifespan => this.setLifespanFilter(lifespan)}
                    options={VALID_LIFESPANS}
                  />
                </Col>

                <Col lg={3} xs={6} className="mt-2">
                  <Select
                    id="height-filter"
                    isClearable
                    placeholder="Height filter..."
                    ref={ref => {
                      this.heightRef = ref;
                    }}
                    onChange={height => this.setHeightFilter(height)}
                    options={VALID_HEIGHTS}
                  />
                </Col>

                <Col lg={3} xs={6} className="mt-2">
                  <Form.Control
                    id="breed-search"
                    type="text"
                    ref={ref => {
                      this.searchParamRef = ref;
                    }}
                    clearButton
                    placeholder="Search for a specific breed..."
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
            </Form>
            <ModelCardDeck
              info_loaded={this.state.info_loaded}
              breedList={this.state.breedList}
              start={start}
              type="Breed"
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
          path={`${this.props.match.path}/:breedId`}
          component={BreedInstance}
        />
      );
    }
  }
}

export default Breeds;
