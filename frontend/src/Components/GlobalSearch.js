import React, { Component } from "react";
import { Row, Col, CardDeck, Container } from "react-bootstrap";
import { Tabs } from "@yazanaabed/react-tabs";
import PageComp from "./PageComp";
import Shelters from "./Shelters"
import ShelterCard from "./ShelterCard"
import Dogs from "./Dogs"
import Breeds from "./Breeds"
import Activities from "./Activities"
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class GlobalSearch extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      info_loaded: false,
      searchParam: this.props.match.params.id,
      activeTabIndex: "tab1",
    };
  }

  async componentDidMount() {
    this.changePage(1)
  }

  async toggle(tabIndex) {
    if (this.state.activeTabIndex !== tabIndex) {
      this.setState({
        activeTabIndex: tabIndex,
      });
    }
  }

  async changePage(pageNum) {
    this.updateShelter(pageNum);
  }

  async updateShelter(pageNum) {
    wrapper.getShelterQuery(
      "",
      "",
      "",
      this.state.searchParam,
      pageNum,
    )
    .then(response => {
      console.log(response);
      this.setState({
        info_loaded: true,
        shelterList: response["objects"],
        shelterCurrentPage: pageNum,
        shelterMaxPage: response["total_pages"],
      });
    });
  }

  render() {
    let shelterCards = null;
    if (this.state.info_loaded) {
      shelterCards = this.state.shelterList.map(shelter => {
        return (
          <div class="mx-auto col-md-auto offset-md-0 col-auto offset-1 mt-2">
            <ShelterCard shelter={shelter} highlight={this.state.searchParam}/>
          </div>
        );
      });
    }

    let shelters = (
      <div>
        <Container>
          {this.state.info_loaded && (
            <CardDeck>
              <div class="card-deck">{shelterCards}</div>
            </CardDeck>
          )}
        </Container>
        <PageComp
          currentPage={this.state.shelterCurrentPage}
          maxPage={this.state.shelterMaxPage}
          changePage={this.changePage}
        />
      </div>
    );

    return (
      <div class="text-center mt-2">
        <h1>
          Search Results for: {this.props.match.params.id}
        </h1>

        <Tabs activeTab={{
          id: this.state.activeTab
        }}>
          <Tabs.Tab id="tab1" title="Shelters">
            {shelters}
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default GlobalSearch;
