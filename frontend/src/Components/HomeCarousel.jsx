import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/HomeCarousel.css";

class HomeCarousel extends Component {
  state = {};
  render() {
    return (
      <Carousel className="Carousel">
        <Carousel.Item>
          <img
            className="Carousel-image"
            src="/images/dog1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="Carousel-image"
            src="/images/dog3.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="Carousel-image"
            src="/images/dog2.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default HomeCarousel;
