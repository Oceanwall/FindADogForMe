import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/DogCard.css";

class DogCard extends Component {
  render() {
    return (
      <Card style={{ width: "18rem", height: "43rem" }}>
        <Card.Img
          variant="top"
          src={this.props.dog.img} //probably need to be images[0] or something
          style={{ width: "auto", height: "300px" }}
        />
        <Card.Body>
          <Card.Title>{this.props.dog.name}</Card.Title>
          <Card.Text>
            <p align="left">Shelter: {this.props.dog.shelter_id}</p>
            <p align="left">
              Breed: {this.props.dog.breed}
            </p>
            <p align="left">Age: {this.props.dog.age}</p>
            <p align="left">Size: {this.props.dog.size}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DogCard;
