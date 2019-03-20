import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class Home extends Component {
  render() {
    return (
      <div>
        <h1> Home Page </h1>
        <Button href="/dogs">Find a Friend!</Button>
      </div>
    );
  }
}

export default Home;
