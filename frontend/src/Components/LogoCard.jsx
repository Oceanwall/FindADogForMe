import React, { Component } from "react";
import "../styles/LogoCard.css";

class LogoCard extends Component {
  render() {
    return (
      <div class="logo-container">
        <img src={this.props.img} class="logo-image" alt="logo" />
        <div class="overlay">
          <div class="logo-text">{this.props.info}</div>
        </div>
      </div>
    );
  }
}

export default LogoCard;
