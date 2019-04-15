import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/DogCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DefaultImage from "./DefaultImage";
import Button from "react-bootstrap/Button";
import Highlighter from "react-highlight-words";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class DogCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelter_name: ""
    };
  }
  getShelterName() {
    let id = this.props.dog.shelter_id;
    wrapper.getShelter(id).then(response => {
      this.setState({ shelter_name: response["name"] });
    });
  }

  async componentDidMount() {
    this.getShelterName();
  }
  render() {
    let card_image;
    if (this.props.dog.image_1) {
      card_image = (
        <Card.Img
          variant="top"
          src={this.props.dog.image_1}
          style={{ width: "auto", height: "300px" }}
        />
      );
    } else {
      card_image = <DefaultImage name={this.props.dog.name} />;
    }

    return (
      <Card style={{ width: "20rem", height: "40rem" }} className="box mt-4">
        {card_image}
        <Card.Body>
          <Card.Title>{<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.dog.name}
            highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}</Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <p align="left">
                    <b>Shelter:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right" className="cutoff">
                    {<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.state.shelter_name}
                      highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Breed:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right" className="capitalize cutoff">
                  <Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.dog.breed}
                    highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Age:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">{<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.dog.age}
                    highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Size:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">{<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.dog.size}
                    highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="button">
                    <Button href={`/dogs/${this.props.dog.id}`}>
                      Learn More
                    </Button>
                  </div>
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
