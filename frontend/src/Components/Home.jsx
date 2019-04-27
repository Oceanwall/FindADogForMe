import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import HomeCarousel from "./HomeCarousel";
import VectorContainer from "./VectorContainer";
import "../styles/Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <br />
        <HomeCarousel />
        <br />
        <VectorContainer />
        <Button
          variant="outline-secondary"
          href="/about"
          className="about-button"
        >
          Learn about our purpose
        </Button>
      </div>
    );
  }
}

export default Home;
