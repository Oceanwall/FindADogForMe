import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class MemberCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.person.img} />
        <Card.Body>
          <Card.Title>{this.props.person.name}</Card.Title>
          <Card.Text>
            <p>Biography: {this.props.person.bio}</p>
            <p>Responsibility: {this.props.person.responsibility}</p>
            <p>Commits: {this.props.person.commits}</p>
            <p>Issues: {this.props.person.issues}</p>
            <p>Unit Tests: {this.props.person.tests}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default MemberCard;
