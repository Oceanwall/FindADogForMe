import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/DogCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';

class DogCard extends Component {
  render() {
    return (
      <Card style={{ width: "18rem", height: "38rem" }}>
        <Card.Img
          variant="top"
          src={this.props.dog.image_1}
          style={{ width: "auto", height: "300px" }}
        />
        <Card.Body>
          <Card.Title>{this.props.dog.name}</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <p align="left"><b>Shelter:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.dog.shelter_id}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left"><b>Breed:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.dog.breed}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left"><b>Age:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.dog.age}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left"><b>Size:</b></p>
                </Col>
                <Col xs="auto">
                  <p align="right">{this.props.dog.size}</p>
                </Col>
              </Row>  
              <Row>
                <Col>
                  <Link to={`/dogs/${this.props.dog.id}`}>Learn More</Link>
                </Col>
              </Row>  
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DogCard;
