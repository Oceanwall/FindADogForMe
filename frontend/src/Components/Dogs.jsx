import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import DogCard from "./DogCard";
import DogInstance from "./DogInstance";
import { Route } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../styles/Dogs.css";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

const VALID_BREEDS = [
  "norfolk terrier",
  "doberman pinscher",
  "boxer",
  "pug",
  "bichon frise",
  "bull terrier",
  "briard",
  "beagle",
  "tibetan mastiff",
  "shih tzu",
  "field spaniel",
  "keeshond",
  "english springer spaniel",
  "staffordshire bull terrier",
  "australian terrier",
  "german pinscher",
  "black and tan coonhound",
  "norwich terrier",
  "cairn terrier",
  "soft coated wheaten terrier",
  "pembroke welsh corgi",
  "english toy terrier",
  "great pyrenees",
  "alaskan husky",
  "thai ridgeback",
  "shetland sheepdog",
  "irish terrier",
  "appenzeller sennenhund",
  "toy fox terrier",
  "tibetan spaniel",
  "american pit bull terrier",
  "lhasa apso",
  "boykin spaniel",
  "standard schnauzer",
  "miniature pinscher",
  "miniature schnauzer",
  "yorkshire terrier",
  "border collie",
  "west highland white terrier",
  "samoyed",
  "american eskimo dog",
  "bearded collie",
  "smooth fox terrier",
  "bluetick coonhound",
  "shiba inu",
  "english toy spaniel",
  "australian cattle dog",
  "cocker spaniel",
  "great dane",
  "coton de tulear",
  "tibetan terrier",
  "old english sheepdog",
  "affenpinscher",
  "pharaoh hound",
  "scottish deerhound",
  "cocker spaniel (american)",
  "welsh springer spaniel",
  "rottweiler",
  "australian kelpie",
  "chow chow",
  "american bulldog",
  "treeing walker coonhound",
  "vizsla",
  "chesapeake bay retriever",
  "belgian malinois",
  "siberian husky",
  "saluki",
  "whippet",
  "kuvasz",
  "cardigan welsh corgi",
  "maltese",
  "irish setter",
  "rat terrier",
  "scottish terrier",
  "border terrier",
  "komondor",
  "bull terrier (miniature)",
  "pomeranian",
  "alaskan malamute",
  "clumber spaniel",
  "schipperke",
  "redbone coonhound",
  "bernese mountain dog",
  "rhodesian ridgeback",
  "basset hound",
  "greyhound",
  "wire fox terrier",
  "cavalier king charles spaniel",
  "english setter",
  "alapaha blue blood bulldog",
  "papillon",
  "irish wolfhound",
  "french bulldog",
  "golden retriever",
  "bedlington terrier",
  "nova scotia duck tolling retriever",
  "airedale terrier",
  "german shorthaired pointer",
  "boston terrier",
  "newfoundland",
  "italian greyhound",
  "giant schnauzer",
  "american staffordshire terrier",
  "american water spaniel",
  "afghan hound",
  "weimaraner",
  "silky terrier",
  "labrador retriever",
  "dalmatian",
  "glen of imaal terrier",
  "basset bleu de gascogne",
  "gordon setter",
  "akita",
  "basenji"
];

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
    this.setState({ sortParam: sort, sortButtonName: label }, () => {
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
          this.setState({ dogList: response["objects"], filtered: true });
        });
    });
  }

  // sets age filter then updates the dogs to show
  setAgeFilter(new_age) {
    this.setState({ age: new_age, ageButtonName: new_age }, () => {
      console.log("Age: ", this.state.age);
      console.log("Size: ", this.state.size);
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
          this.setState({ dogList: response["objects"], filtered: true });
        });
    });
  }

  // sets size filter then updates the dogs to show
  setSizeFilter(new_size, label) {
    this.setState({ size: new_size, sizeButtonName: label }, () => {
      console.log("Age: ", this.state.age);
      console.log("Size: ", this.state.size);
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
          this.setState({ dogList: response["objects"], filtered: true });
        });
    });
  }

  setBreedFilter(new_breed) {
    this.setState({ breed: new_breed }, () => console.log(this.state.breed));
  }

  render() {
    if (this.props.match.isExact) {
      let dogCards = null;
      if (this.state.info_loaded) {
        dogCards = this.state.dogList.map(dog => {
          return (
            <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
              <DogCard dog={dog} />
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
            <Row className="search-bar">
              <Button
                variant="danger"
                onClick={() =>
                  this.setState(
                    {
                      age: "",
                      breed: "",
                      size: "",
                      ageButtonName: "Filter by age",
                      sizeButtonName: "Filter by size",
                      sortButtonName: "Sort",
                      sort: undefined,
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
                  eventKey="Smallest-Biggest"
                  onSelect={eventKey => this.setSort("reverse_size", eventKey)}
                >
                  Smallest-Biggest
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Biggest-Smallest"
                  onSelect={eventKey => this.setSort("size", eventKey)}
                >
                  Biggest-Smallest
                </Dropdown.Item>
              </DropdownButton>

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

              <Button>Search</Button>
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
