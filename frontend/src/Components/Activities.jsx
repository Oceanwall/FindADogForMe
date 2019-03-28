import React, { Component } from "react";
import PageComp from "./PageComp";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import ActivityCard from "./ActivityCard";
import ActivityInstance from "./ActivityInstance";
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class Activities extends Component {
  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false
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
    wrapper.getActivity(undefined, pageNum).then(response => {
      this.setState(state => ({
        currentPage: pageNum,
        maxPage: response["total_pages"],
        activityList: response["objects"],
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
          <div class="text-center">
            <h1> Activities</h1>
          </div>
          <Container>
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
