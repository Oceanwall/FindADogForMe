import React, { Component } from "react";
import "../styles/DefaultImage.css";

class DefaultImage extends Component {
  // Stops cards from reloading colors on state changes.
  /*
  shouldComponentUpdate() {
    return false;
  }
*/
  render() {
    let words = this.props.name.trim().split(" ");
    let initials = "";
    if (words.length > 1) {
      initials = words[0][0] + words[1][0];
    } else {
      initials = words[0][0];
    }
    initials = initials.toUpperCase();

    let style;
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        style = { "background-color": "#e0efc2" };
        break;
      case 1:
        style = { "background-color": "#c1f4f0" };
        break;
      case 2:
        style = { "background-color": "#f4e1c0" };
        break;
      case 3:
        style = { "background-color": "#efc6bf" };
        break;
      case 4:
        style = { "background-color": "#ddbbea" };
        break;
    }

    return (
      <div class="default-image-wrapper" style={style}>
        {initials}
      </div>
    );
  }
}
export default DefaultImage;
