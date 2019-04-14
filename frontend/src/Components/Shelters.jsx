import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import ShelterCard from "./ShelterCard";
import ShelterInstance from "./ShelterInstance";
import { Route } from "react-router-dom";
import { VALID_CITIES } from "../valid_options.jsx";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Shelters extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false,
      zipcode: "",
      phone: "",
      city: "",
      searchParam: undefined,
      sortParam: undefined,
      filtered: false,
      sortButtonName: "Sort"
    };
    this.changePage = this.changePage.bind(this);
    this.updateShelter = this.updateShelter.bind(this);
    this.setCityFilter = this.setCityFilter.bind(this);
    this.setPhoneFilter = this.setPhoneFilter.bind(this);
    this.setZipFilter = this.setZipFilter.bind(this);
    this.reset = this.reset.bind(this);
    this.setSort = this.setSort.bind(this);
    this.modelSearch = this.modelSearch.bind(this);

    this.zipcodeRef = React.createRef();
    this.phoneRef = React.createRef();
    this.cityRef = React.createRef();
    this.searchParamRef = React.createRef();
  }

  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState(state => ({
      info_loaded: false
    }));
    this.updateShelter(pageNum);
  }

  //server request method. called everytime page change, and on initial mount
  async updateShelter(pageNum) {
    wrapper.getShelter(undefined, pageNum).then(response => {
      this.setState(state => ({
        currentPage: pageNum,
        maxPage: response["total_pages"],
        shelterList: response["objects"],
        info_loaded: true
      }));
    });
  }
  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
  }

  filter() {
    wrapper
      .getShelterQuery(
        this.state.city,
        this.state.zipcode,
        this.state.phone,
        this.state.searchParam,
        this.state.sortParam
      )
      .then(response => {
        console.log(response);
        this.setState({
          shelterList: response["objects"],
          maxPage: response["total_pages"],
          info_loaded: true
        });
      });
  }

  setCityFilter(city) {
    if (city.length == 0) city = "";
    let filter =
      city != "" ||
      this.state.age != "" ||
      this.state.size != "" ||
      this.state.sortParam != undefined ||
      this.state.searchParam != undefined;
    this.setState({ city: city, filtered: filter }, () => {
      console.log(this.state.city);
      console.log(this.state.zipcode);
      console.log(this.state.phone);
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

  setZipFilter(zipcode) {
    if (zipcode.length == 5) {
      this.setState(
        {
          zipcode: zipcode
        },
        () => {
          console.log(this.state.phone);
          this.filter();
        }
      );
    }
    if (zipcode.length == 0) {
      this.setState(
        {
          zipcode: ""
        },
        () => {
          if (this.state.filtered) {
            this.filter();
          } else {
            this.changePage(1);
          }
        }
      );
    }
  }

  setPhoneFilter(area_code) {
    console.log(area_code);
    if (area_code.length == 3) {
      this.setState(
        {
          phone: area_code
        },
        () => this.filter()
      );
    }
    if (area_code.length == 0) {
      this.setState(
        {
          phone: ""
        },
        () => {
          if (this.state.filtered) {
            this.filter();
          } else {
            this.changePage(1);
          }
        }
      );
    }
  }

  setSort(sort, label) {
    this.setState(
      { sortParam: sort, sortButtonName: label, filtered: true },
      () => {
        this.filter();
      }
    );
  }

  modelSearch() {
    this.setState({
      searchParam: this.searchParamRef.value
    }, this.filter);
  }

  reset() {
    this.setState(
      {
        city: "",
        phone: "",
        zipcode: "",
        sortButtonName: "Sort",
        sortParam: undefined,
        searchParam: undefined,
        filtered: false
      },
      () => this.updateShelter(1)
    );

    this.zipcodeRef.value = "";
    this.phoneRef.value = "";
    this.cityRef.getInstance().clear();
    this.searchParamRef.value = "";
  }

  render() {
    if (this.props.match.isExact) {
      let shelterCards = null;
      if (this.state.info_loaded) {
        shelterCards = this.state.shelterList.map(shelter => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <ShelterCard shelter={shelter} />
            </div>
          );
        });
      }
      return (
        <div>
          <div class="text-center mt-2">
            <h1> Shelters</h1>
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
                      eventKey="Ascending zipcode"
                      onSelect={eventKey => this.setSort("zipcode", eventKey)}
                    >
                      Ascending zipcode
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Descending zipcode"
                      onSelect={eventKey =>
                        this.setSort("reverse_zipcode", eventKey)
                      }
                    >
                      Descending zipcode
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Form.Control
                    type="zip-code"
                    placeholder="Filter by zipcode..."
                    maxLength={5}
                    ref={ref => { this.zipcodeRef = ref; }}
                    onChange={event => this.setZipFilter(event.target.value)}
                  />
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Form.Control
                    type="area-code"
                    placeholder="Filter by phone area code..."
                    maxLength={3}
                    ref={ref => { this.phoneRef = ref; }}
                    onChange={event => this.setPhoneFilter(event.target.value)}
                  />
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Typeahead
                    id="city-search"
                    clearButton
                    placeholder="Filter by city..."
                    selectHintOnEnter={true}
                    ref={ref => { this.cityRef = ref; }}
                    onChange={city => this.setCityFilter(city)}
                    options={VALID_CITIES}
                  />
                </Col>

                <Col md={2} xs={6} className="mt-2">
                  <Form.Control
                    id="shelter-search"
                    type="text"
                    ref={ref => { this.searchParamRef = ref; }}
                    clearButton
                    placeholder="Search for a specific shelter..."
                  />
                </Col>

                <Col md={1} xs={6} className="mt-2">
                  <Button onClick={this.modelSearch}>
                    Search
                  </Button>
                </Col>

              </Row>
            </Form>
            {this.state.info_loaded && (
              <CardDeck>
                <div class="card-deck">{shelterCards}</div>
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
          path={`${this.props.match.path}/:shelterId`}
          component={ShelterInstance}
        />
      );
    }
  }
}

export default Shelters;
