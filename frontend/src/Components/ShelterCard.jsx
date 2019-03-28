import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ShelterCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import DefaultImage from "./DefaultImage";
import Button from "react-bootstrap/Button";

class ShelterCard extends Component {
  render() {
    return (
      <Card style={{ width: "18rem", height: "35rem" }} className="mt-4">
        <DefaultImage name={this.props.shelter.name} />
        <Card.Body>
          <Card.Title>{this.props.shelter.name}</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <p align="left">
                    <b>City:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.shelter.city}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>State:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.shelter.state}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Phone:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {this.props.shelter.phone
                      ? this.props.shelter.phone
                      : "None Provided"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Address:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {this.props.shelter.address
                      ? this.props.shelter.address
                      : "None Provided"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button href={`/shelters/${this.props.shelter.id}`}>
                    Learn More
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ShelterCard;
