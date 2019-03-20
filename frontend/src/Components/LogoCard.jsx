import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class LogoCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card style={{ width: "18rem", border: "light" }}>
        <Card.Img src={this.props.src} />
      </Card>
    );
  }
}

export default LogoCard;
