import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ShelterCard.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DefaultImage from "./DefaultImage";
import Button from "react-bootstrap/Button";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Highlighter from "react-highlight-words";

class ShelterCard extends Component {
  render() {
    let phone_number = parsePhoneNumberFromString(
      "+1" + this.props.shelter.phone
    );
    if (!phone_number) phone_number = this.props.shelter.phone;
    else phone_number = phone_number.formatNational();

    return (
      <Card
        style={{ width: "20rem", height: "38rem" }}
        className="box mt-4 custom-card"
      >
        <DefaultImage name={this.props.shelter.name} />
        <Card.Body>
          <Card.Title className="cutoff">
            {
              <Highlighter
                highlightClassName="search-highlight"
                searchWords={[this.props.highlight]}
                textToHighlight={this.props.shelter.name}
                highlightStyle={{
                  padding: "0px",
                  "background-color": "#fdff32"
                }}
              />
            }
          </Card.Title>
          <Card.Text>
            <Container>
              <Row>
                <Col>
                  <p align="left">
                    <b>City:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {
                      <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[this.props.highlight]}
                        textToHighlight={this.props.shelter.city}
                        highlightStyle={{
                          padding: "0px",
                          "background-color": "#fdff32"
                        }}
                      />
                    }
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p align="left">
                    <b>Zip:</b>
                  </p>
                </Col>
                <Col xs="auto">
                  <p align="right">
                    {
                      <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[this.props.highlight]}
                        textToHighlight={String(this.props.shelter.zipcode)}
                        highlightStyle={{
                          padding: "0px",
                          "background-color": "#fdff32"
                        }}
                      />
                    }
                  </p>
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
                    {
                      <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[this.props.highlight]}
                        textToHighlight={
                          phone_number ? phone_number : "None Provided"
                        }
                        highlightStyle={{
                          padding: "0px",
                          "background-color": "#fdff32"
                        }}
                      />
                    }
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
                    {
                      <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[this.props.highlight]}
                        textToHighlight={
                          this.props.shelter.address
                            ? this.props.shelter.address
                            : "None Provided"
                        }
                        highlightStyle={{
                          padding: "0px",
                          "background-color": "#fdff32"
                        }}
                      />
                    }
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
