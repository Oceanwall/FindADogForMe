import React, { Component } from "react";
import "../styles/InstanceCarousel.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Carousel from "react-bootstrap-carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class InstanceCarousel extends Component {
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
    let imagesArray = this.props.images.map(image => {
      return (
        <img
          className="Carousel-instance-image"
          src={image}
          alt="instance-carousel-img"
        />
      );
    });
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
              {imagesArray}
            </Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InstanceCarousel;
