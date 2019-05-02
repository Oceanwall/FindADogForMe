import React, { Component } from "react";
import PageComp from "./PageComp";
import Container from "react-bootstrap/Container";
import DogInstance from "./DogInstance";
import { Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../styles/Dogs.css";
import Select from "react-select";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { VALID_BREEDS } from "../valid_options.jsx";
import "../styles/DropdownButton.css";
import ModelCardDeck from "./ModelCardDeck";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Dogs extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false,
      age: "",
      size: "",
      breed: "",
      ageButtonName: "Filter by age",
      sizeButtonName: "Filter by size",
      sortButtonName: "Sort",
      searchParam: undefined,
      sortParam: undefined,
      filtered: false
    };

    this.changePage = this.changePage.bind(this);
    this.updateDog = this.updateDog.bind(this);
    this.setAgeFilter = this.setAgeFilter.bind(this);
    this.setSizeFilter = this.setSizeFilter.bind(this);
    this.setBreedFilter = this.setBreedFilter.bind(this);
    this.setSort = this.setSort.bind(this);
    this.filter = this.filter.bind(this);
    this.modelSearch = this.modelSearch.bind(this);
    this.reset = this.reset.bind(this);
    this.checkFiltered = this.checkFiltered.bind(this);

    this.breedRef = React.createRef();
    this.searchParamRef = React.createRef();
  }

  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState({
      info_loaded: false
    });
    this.updateDog(pageNum);
  }

  //server request method. called everytime page change, and on initial mount
  async updateDog(pageNum) {
    console.log("updateDog called, filter is", this.state.filtered);
    if (!this.state.filtered) {
      wrapper.getDog(undefined, pageNum).then(response => {
        this.setState({
          currentPage: pageNum,
          maxPage: response["total_pages"],
          dogList: response["objects"],
          info_loaded: true
        });
      });
    } else {
      this.filter(pageNum);
    }
  }
  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }

  filter(pageNum = 1) {
    if (this.state.filtered) {
      wrapper
        .getDogQuery(
          this.state.breed,
          this.state.age,
          this.state.size,
          this.state.searchParam,
          this.state.sortParam
        )
        .then(response => {
          console.log(response);
          this.setState({
            dogList: response["objects"],
            maxPage: response["total_pages"],
            info_loaded: true,
            currentPage: pageNum
          });
        });
    }
  }

  // sets sort criteria then updates the dogs to show
  setSort(sort, label) {
    this.setState(
      { sortParam: sort, sortButtonName: label, filtered: true },
      () => {
        this.filter();
      }
    );
  }

  // sets age filter then updates the dogs to show
  setAgeFilter(new_age) {
    this.setState(
      { age: new_age, ageButtonName: new_age, filtered: true },
      () => {
        this.filter();
      }
    );
  }

  // sets size filter then updates the dogs to show
  setSizeFilter(new_size, label) {
    this.setState(
      { size: new_size, sizeButtonName: label, filtered: true },
      () => {
        this.filter();
      }
    );
  }

  // sets breed filter
  setBreedFilter(new_breed) {
    new_breed =
      new_breed === null || new_breed.length === 0 ? "" : new_breed.value;
    this.setState({ breed: new_breed }, () => {
      this.setState({ filtered: this.checkFiltered() }, () => {
        if (this.state.filtered) {
          this.filter();
        } else {
          this.changePage(1);
        }
      });
    });
  }

  checkFiltered() {
    return (
      this.state.breed !== "" ||
      this.state.age !== "" ||
      this.state.size !== "" ||
      this.state.sortParam !== undefined ||
      this.state.searchParam !== undefined
    );
  }

  reset() {
    this.setState(
      {
        age: "",
        breed: "",
        size: "",
        ageButtonName: "Filter by age",
        sizeButtonName: "Filter by size",
        sortButtonName: "Sort",
        sortParam: undefined,
        searchParam: undefined,
        filtered: false
      },
      () => {
        this.updateDog(1);
        this.breedRef.select.clearValue();
        this.searchParamRef.value = "";
      }
    );
  }

  modelSearch() {
    this.setState(
      {
        searchParam: this.searchParamRef.value,
        filtered: this.searchParamRef.value == "" ? false : true
      },
      () => {
        if (this.state.filtered) {
          this.filter();
        } else {
          this.updateDog(1);
        }
      }
    );
  }

  render() {
    if (this.props.match.isExact) {
      return (
        <div>
          <div class="text-center mt-3">
            <h1> Dogs</h1>
          </div>
          <Container>
            <Row className="search-bar mt-2">
              <Col lg={1} xs={3} className="mt-2">
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
                  id="sort-select"
                  title={this.state.sortButtonName}
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
                    eventKey="Smallest-Biggest"
                    onSelect={eventKey => this.setSort("size", eventKey)}
                  >
                    Smallest-Biggest
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Biggest-Smallest"
                    onSelect={eventKey =>
                      this.setSort("reverse_size", eventKey)
                    }
                  >
                    Biggest-Smallest
                  </Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col lg="auto" xs={6} className="mt-2">
                <DropdownButton
                  id="age-filter"
                  title={this.state.ageButtonName}
                >
                  <Dropdown.Item
                    eventKey="Baby"
                    onSelect={() => this.setAgeFilter("Baby")}
                  >
                    Baby
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Young"
                    onSelect={() => this.setAgeFilter("Young")}
                  >
                    Young
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Adult"
                    onSelect={() => this.setAgeFilter("Adult")}
                  >
                    Adult
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Senior"
                    onSelect={() => this.setAgeFilter("Senior")}
                  >
                    Senior
                  </Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col lg="auto" xs={6} className="mt-2">
                <DropdownButton
                  id="size-filter"
                  title={this.state.sizeButtonName}
                >
                  <Dropdown.Item
                    eventKey="Small"
                    onSelect={eventKey => this.setSizeFilter("S", eventKey)}
                  >
                    Small
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Medium"
                    onSelect={eventKey => this.setSizeFilter("M", eventKey)}
                  >
                    Medium
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Large"
                    onSelect={eventKey => this.setSizeFilter("L", eventKey)}
                  >
                    Large
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Extra Large"
                    onSelect={eventKey => this.setSizeFilter("XL", eventKey)}
                  >
                    Extra Large
                  </Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col lg={3} xs={6} className="mt-2">
                <Select
                  id="breed-filter"
                  isClearable
                  placeholder="Filter by breed..."
                  ref={ref => {
                    this.breedRef = ref;
                  }}
                  onChange={breed => this.setBreedFilter(breed)}
                  options={VALID_BREEDS}
                />
              </Col>

              <Col lg={3} xs={6} className="mt-2">
                <Form.Control
                  id="dog-search"
                  type="text"
                  ref={ref => {
                    this.searchParamRef = ref;
                  }}
                  clearButton
                  placeholder="Search for a specific dog..."
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.modelSearch();
                    }
                  }}
                />
              </Col>

              <Col lg={2} xs={6} className="mt-2">
                <Button id="search-button" onClick={this.modelSearch}>
                  Search
                </Button>
              </Col>
            </Row>
            <ModelCardDeck
              info_loaded={this.state.info_loaded}
              type="Dog"
              dogList={this.state.dogList}
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
          path={`${this.props.match.path}/:dogId`}
          component={DogInstance}
        />
      );
    }
  }
}

export default Dogs;
