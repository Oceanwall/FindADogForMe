import React, { Component } from "react";
import "./LogoCard.css";

class LogoCard extends Component {
  render() {
    return (
      <div class="logo-container">
        <img src={this.props.img} class="logo-image" />
        <div class="overlay">
          <div class="text">{this.props.info}</div>
        </div>
      </div>
    );
  }
}

export default LogoCard;
