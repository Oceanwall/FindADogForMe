import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import "../styles/Error404.css";

class Error404 extends Component {
  render() {
    return (
    <Container>
      <div className="text-center">
        <h1 className="display-2 error-header mt-2">404 ERROR</h1>
        <img className="error-dog" src="images/404dog.jpg" alt="Cartoon dog indicating presence of a 404 error."></img>
        <div className="error-text">Sorry, but the page you're looking for doesn't exist!</div>
        {/* TODO: Add a back button? */}
      </div>
    </Container>
    );
  }
}

export default Error404;
