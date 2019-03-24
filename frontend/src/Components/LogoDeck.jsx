import React, { Component } from "react";
import "../styles/LogoDeck.css";
import LogoCard from "./LogoCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class LogoDeck extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row className="logo-deck">
            <LogoCard
              img="/images/bootstrap.png"
              info="Used for front-end styling"
            />
            <LogoCard
              img="/images/aws.png"
              info="Used to host website in the cloud"
            />
            <LogoCard
              img="/images/docker.png"
              info="Used to create containers for frontend/backend stacks"
            />
            <LogoCard
              img="/images/gitlab.png"
              info="Used for version control and project management"
            />
            <LogoCard
              img="/images/postman.png"
              info="Used for API development and testing"
            />

            <LogoCard
              img="/images/react.png"
              info="Used for for frontend development"
            />
            <LogoCard
              img="/images/namecheap.png"
              info="Used to obtain domain name"
            />
            <LogoCard
              img="/images/selenium.png"
              info="Used to create accpectance tests of GUI"
            />
            <LogoCard
              img="/images/mocha.png"
              info="Used to create unit tests of JavaScript code"
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default LogoDeck;
