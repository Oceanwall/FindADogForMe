import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import DogCard from "./DogCard";
import DogInstance from "./DogInstance";
import { Route } from "react-router-dom";

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
      info_loaded: false
    };
    this.changePage = this.changePage.bind(this);
    this.updateDog = this.updateDog.bind(this);
  }

  //change page. pretty much copy paste this around, replace 'this.updateDog'
  changePage(pageNum) {
    this.setState(state => ({
      info_loaded: false
    }));
    this.updateDog(pageNum);
  }

  //server request method. called everytime page change, and on initial mount
  async updateDog(pageNum) {
    wrapper.getDog(undefined, pageNum).then(response => {
      this.setState(state => ({
        currentPage: pageNum,
        maxPage: response["total_pages"],
        dogList: response["objects"],
        info_loaded: true
      }));
    });
  }
  //update page on initial mount to load information
  async componentDidMount() {
    this.changePage(1);
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
