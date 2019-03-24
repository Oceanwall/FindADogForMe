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
          <Card.Title>
            <b>{this.props.person.name}</b>
          </Card.Title>
          <Card.Text>
            <p align="left">
              <b>Biography:</b> {this.props.person.bio}
            </p>
            <p align="left">
              <b> Responsibility: </b>
              {this.props.person.responsibility}
            </p>
            <p align="left">
              <b>Commits: </b>
              {this.props.person.commits}
            </p>
            <p align="left">
              <b>Issues:</b> {this.props.person.issues}
            </p>
            <p align="left">
              <b>Unit Tests: </b>
              {this.props.person.tests}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default MemberCard;
