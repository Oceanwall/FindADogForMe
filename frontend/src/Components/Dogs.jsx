import React, { Component } from "react";
import PageComp from "./PageComp";

class Dogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 2,
      maxPage: 10 //Change to api call.
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(pageNum) {
    this.setState(state => ({
      currentPage: pageNum
    }));
  }
  render() {
    return (
      <div>
        <div class="text-center">
          <h1> Dogs</h1>
        </div>
        <PageComp
          currentPage={this.state.currentPage}
          maxPage={this.state.maxPage}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default Dogs;
