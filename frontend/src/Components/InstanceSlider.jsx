import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/InstanceSlider.css";
class InstanceSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: this.props.cards.length >= 3 ? true : false,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true
    };
    return (
      <div>
        <p align="left" class="deck-title-text">
          {this.props.title}
        </p>
        <Slider {...settings}>{this.props.cards}</Slider>
      </div>
    );
  }
}

export default InstanceSlider;
