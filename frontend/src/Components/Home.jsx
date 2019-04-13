import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import HomeCarousel from "./HomeCarousel";
import VectorContainer from "./VectorContainer";

class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <HomeCarousel />
        <br />
        <VectorContainer />
      </div>
    );
  }
}

export default Home;
