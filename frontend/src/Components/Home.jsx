import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import HomeCarousel from "./HomeCarousel";

class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <HomeCarousel />
        <br />
        <Button href="/dogs">Find a Friend!</Button>
      </div>
    );
  }
}

export default Home;
