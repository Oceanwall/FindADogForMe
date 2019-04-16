import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/BreedCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import DefaultImage from "./DefaultImage";
import Highlighter from "react-highlight-words";

class BreedCard extends Component {
  render() {
    let card_image;
    if (this.props.breed.image_1) {
      card_image = (
        <Card.Img
          variant="top"
          src={this.props.breed.image_1}
          style={{ height: "300px" }}
        />
      );
    } else {
      card_image = <DefaultImage name={this.props.breed.name} />;
    }

    return (
      <Card style={{ width: "20rem", height: "40rem" }} className="box mt-4 custom-card">
        {card_image}
        <Card.Body>
          <Card.Title className="capitalize">
            {<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.breed.name}
              highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}
          </Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <p align="left">
                    <b>Group:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">{<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.breed.group}
                    highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Temperament:</b>
                  </p>
                </Col>
                <Col>
                  <p align="right" class="cutoff">
                    {<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.breed.temperament}
                      highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Lifespan:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.breed.min_lifespan.toFixed(1)
                      + " - " +
                      this.props.breed.max_lifespan.toFixed(1)
                      + " (years)"}
                      highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Height:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {<Highlighter searchWords={[this.props.highlight]} textToHighlight={this.props.breed.min_height.toFixed(1)
                      + " - " +
                      this.props.breed.max_height.toFixed(1)
                      + " (inches)"}
                      highlightStyle={{"padding": "0px", "background-color": "#fdff32"}}/>}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button href={`/breeds/${this.props.breed.name}`}>
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

export default BreedCard;
