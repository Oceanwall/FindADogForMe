import React, { Component } from "react";
import "../styles/HomeCarousel.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Carousel from "react-bootstrap-carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class HomeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true
    };
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  visiableOnSelect = active => {
    console.log(`visiable onSelect active=${active}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    leftIcon = leftIcon ? undefined : <span className="fa fa-glass" />;
    rightIcon = rightIcon ? undefined : <span className="fa fa-music" />;
    this.setState({ leftIcon, rightIcon });
  };

  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <div id="carousel-container">
        <Carousel
          animation={true}
          autoplay={this.state.autoplay}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onSelect={this.onSelect}
          ref={r => (this.slider = r)}
          version={4}
        >
          <div>
            <img
              className="Carousel-image"
              src="/images/dog_main.jpg"
              alt="home-carousel-img-1"
            />
            <div className="carousel-caption">
              <h3>Dogs</h3>
              <p>Find the perfect dog for you</p>
            </div>
          </div>
          <div>
            <img
              className="Carousel-image"
              src="/images/dog2.jpeg"
              alt="home-carousel-img-2"
            />
            <div className="carousel-caption">
              <h3>Activities</h3>
              <p>Explore dog related activities and events</p>
            </div>
          </div>
          <div>
            <img
              className="Carousel-image"
              src="/images/dog1.jpg"
              alt="home-carousel-img-3"
            />
            <div className="carousel-caption">
              <h3>Shelters</h3>
              <p>Find and learn more about nearby dog shelters</p>
            </div>
          </div>
          <div>
            <img
              className="Carousel-image"
              src="/images/dog_group.jpg"
              alt="home-carousel-img-4"
            />
            <div className="carousel-caption">
              <h3>Breeds</h3>
              <p>Discover and learn more about dog breeds</p>
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default HomeCarousel;
