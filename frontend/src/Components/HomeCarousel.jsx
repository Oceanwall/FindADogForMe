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
      <div className="container-fluid">
        <Row>
          <Col>
            <Carousel
              animation={true}
              autoplay={this.state.autoplay}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onSelect={this.onSelect}
              ref={r => (this.slider = r)}
              version={4}
            >
              <img
                className="Carousel-image"
                src="./images/dog1.jpg"
                alt="home-carousel-img-1"
              />

              <img
                className="Carousel-image"
                src="./images/dog2.jpeg"
                alt="home-carousel-img-2"
              />

              <img
                className="Carousel-image"
                src="./images/dog3.jpg"
                alt="home-carousel-img-3"
              />
            </Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeCarousel;
