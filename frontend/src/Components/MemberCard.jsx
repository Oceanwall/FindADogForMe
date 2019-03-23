import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/MemberCard.css";

class MemberCard extends Component {
  render() {
    return (
      <Card style={{ width: "18rem", height: "43rem" }}>
        <Card.Img
          variant="top"
          src={this.props.person.img}
          style={{ width: "auto", height: "300px" }}
        />
        <Card.Body>
          <Card.Title>{this.props.person.name}</Card.Title>
          <Card.Text>
            <p align="left">Biography: {this.props.person.bio}</p>
            <p align="left">
              Responsibility: {this.props.person.responsibility}
            </p>
            <p align="left">Commits: {this.props.person.commits}</p>
            <p align="left">Issues: {this.props.person.issues}</p>
            <p align="left">Unit Tests: {this.props.person.tests}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default MemberCard;
