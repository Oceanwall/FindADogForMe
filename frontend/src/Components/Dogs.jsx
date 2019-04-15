import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import DogCard from "./DogCard";
import DogInstance from "./DogInstance";
import { Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../styles/Dogs.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { VALID_BREEDS } from "../valid_options.jsx";

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
      wrapper
        .getDogQuery(
          this.state.breed,
          this.state.age,
          this.state.size,
          this.state.searchParam,
          this.state.sortParam,
          pageNum
        )
        .then(response => {
          console.log(response);
          this.setState({
            dogList: response["objects"],
            currentPage: pageNum,
            maxPage: response["total_pages"],
            info_loaded: true
          });
        });
    }
  }
  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }

  // sets sort criteria then updates the dogs to show
  setSort(sort, label) {
    this.setState(
      { sortParam: sort, sortButtonName: label, filtered: true },
      () => {
        console.log(this.state.age);
        console.log(this.state.size);
        console.log(this.state.breed);
        console.log(this.state.sortParam);
        console.log(this.state.searchParam);
        this.filter();
      }
    );
  }

  // sets age filter then updates the dogs to show
  setAgeFilter(new_age) {
    this.setState(
      { age: new_age, ageButtonName: new_age, filtered: true },
      () => {
        console.log(this.state.age);
        console.log(this.state.size);
        console.log(this.state.breed);
        console.log(this.state.sortParam);
        console.log(this.state.searchParam);
        this.filter();
      }
    );
  }

  // sets size filter then updates the dogs to show
  setSizeFilter(new_size, label) {
    this.setState(
      { size: new_size, sizeButtonName: label, filtered: true },
      () => {
        console.log(this.state.age);
        console.log(this.state.size);
        console.log(this.state.breed);
        console.log(this.state.sortParam);
        console.log(this.state.searchParam);
        this.filter();
      }
    );
  }

  // sets breed filter
  setBreedFilter(new_breed) {
    if (new_breed.length == 0) new_breed = "";
    let filter =
      new_breed != "" ||
      this.state.age != "" ||
      this.state.size != "" ||
      this.state.sortParam != undefined ||
      this.state.searchParam != undefined;
    this.setState({ breed: new_breed, filtered: filter }, () => {
      console.log(this.state.age);
      console.log(this.state.size);
      console.log(this.state.breed);
      console.log(this.state.sortParam);
      console.log(this.state.searchParam);
      console.log(this.state.filtered);
      if (filter) {
        this.filter();
      } else {
        this.changePage(1);
      }
    });
  }

  filter() {
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
          currentPage: 1
        });
      });
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
      () => this.updateDog(1)
    );

    this.breedRef.getInstance().clear();
    this.searchParamRef.value = "";
  }

  modelSearch() {
    this.setState(
      {
        searchParam: this.searchParamRef.value
      },
      this.filter
    );
  }

  render() {
    if (this.props.match.isExact) {
      let dogCards = null;
      if (this.state.info_loaded) {
        dogCards = this.state.dogList.map(dog => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <DogCard dog={dog} highlight={this.state.searchParam}/>
            </div>
          );
        });
      }
      return (
        <div>
          <div class="text-center mt-2">
            <h1> Dogs</h1>
          </div>
          <Container>
            <Row className="search-bar mt-2">
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

              <Col md={2} xs={6} className="mt-2">
                <DropdownButton title={this.state.ageButtonName}>
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

              <Col md={2} xs={6} className="mt-2">
                <DropdownButton title={this.state.sizeButtonName}>
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

              <Col md={2} xs={6} className="mt-2">
                <Typeahead
                  id="breed-search"
                  clearButton
                  placeholder="Filter by breed..."
                  selectHintOnEnter={true}
                  ref={ref => {
                    this.breedRef = ref;
                  }}
                  onChange={breed => this.setBreedFilter(breed)}
                  options={VALID_BREEDS}
                />
              </Col>

              <Col md={2} xs={8} className="mt-2">
                <Form.Control
                  id="dog-search"
                  type="text"
                  ref={ref => {
                    this.searchParamRef = ref;
                  }}
                  clearButton
                  placeholder="Search for a specific dog..."
                />
              </Col>

              <Col md={1} xs={4} className="mt-2">
                <Button onClick={this.modelSearch}>Search</Button>
              </Col>
            </Row>
            {this.state.info_loaded && (
              <CardDeck>
                <div class="card-deck">{dogCards}</div>
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
          path={`${this.props.match.path}/:dogId`}
          component={DogInstance}
        />
      );
    }
  }
}

export default Dogs;
