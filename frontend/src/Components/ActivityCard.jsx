import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ActivityCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';

class ActivityCard extends Component {
  render() {
    return (
      <Card style={{ width: "18rem", height: "35rem" }}>
        <Card.Img
          variant="top"
          src={this.props.activity.image_1}
          style={{ width: "auto", height: "300px" }}
        />
        <Card.Body>
          <Card.Title>{this.props.activity.name}</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <p align="left"><b>Date:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.activity.date}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left"><b>Free:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.activity.is_free ? "Yes" : "No"}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left"><b>Location:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.activity.location}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left"><b>Type:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.activity.type}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link to={`/activities/${this.props.activity.id}`}>Learn More</Link>
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
