import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ActivityCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DefaultImage from "./DefaultImage";
import Button from "react-bootstrap/Button";

class ActivityCard extends Component {
  render() {
    let card_image;
    if (this.props.activity.image_1) {
      card_image = (
        <Card.Img
          variant="top"
          src={this.props.activity.image_1}
          style={{ width: "auto", height: "300px" }}
        />
      );
    } else {
      card_image = <DefaultImage name={this.props.activity.name} />;
    }

    return (
      <Card style={{ width: "20rem", height: "35rem" }} className="box mt-4">
        {card_image}
        <Card.Body>
          <Card.Title className="cutoff">{this.props.activity.name}</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                {this.props.activity.date != null ? (
                  <div>
                    <Col>
                      <p align="left">
                        <b>Date:</b>
                      </p>
                    </Col>
                    <Col xs="auto">
                      <p align="right">{this.props.activity.date}</p>
                    </Col>
                  </div>
                ) : (
                  <div>
                    <Col>
                      <p align="left">
                        <b>Designation:</b>
                      </p>
                    </Col>
                    <Col xs="auto">
                      <p align="right">{this.props.activity.designation}</p>
                    </Col>
                  </div>
                )}
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Free:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {this.props.activity.is_free ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Location:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.activity.location}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Type:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right" className="capitalize">
                    {this.props.activity.type}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button href={`/activities/${this.props.activity.id}`}>
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

export default ActivityCard;
