import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ActivityCard.css";
import "../styles/Card.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DefaultImage from "./DefaultImage";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";

class ActivityCard extends Component {
  render() {
    let card_image;
    if (this.props.activity.image_1) {
      card_image = (
        <Card.Img
          variant="top"
          src={this.props.activity.image_1}
          className="card-image"
        />
      );
    } else {
      card_image = <DefaultImage name={this.props.activity.name} />;
    }

    return (
      <Link className="card-link" to={`/activities/${this.props.activity.id}`}>
        <Card style={{ height: "42.5rem" }} className="box mt-4 custom-card">
          {card_image}
          <Card.Body>
            <Card.Title className="cutoff">
              {
                <Highlighter
                  highlightClassName="search-highlight"
                  searchWords={[this.props.highlight]}
                  textToHighlight={this.props.activity.name}
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
                  {this.props.activity.date != null ? (
                    <div>
                      <Col>
                        <p align="left">
                          <b>Date:</b>
                        </p>
                      </Col>
                      <Col>
                        <p align="right">
                          {
                            <Highlighter
                              highlightClassName="search-highlight"
                              searchWords={[this.props.highlight]}
                              textToHighlight={this.props.activity.date}
                              highlightStyle={{
                                padding: "0px",
                                "background-color": "#fdff32"
                              }}
                            />
                          }
                        </p>
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
                        <p align="right">
                          {
                            <Highlighter
                              highlightClassName="search-highlight"
                              searchWords={[this.props.highlight]}
                              textToHighlight={this.props.activity.designation}
                              highlightStyle={{
                                padding: "0px",
                                "background-color": "#fdff32"
                              }}
                            />
                          }
                        </p>
                      </Col>
                    </div>
                  )}
                </Row>
                <Row>
                  <Col>
                    <p align="left">
                      <b>Cost:</b>
                    </p>
                  </Col>
                  <Col xs="auto">
                    <p align="right">
                      <Highlighter
                        highlightClassName="search-highlight"
                        searchWords={[this.props.highlight]}
                        textToHighlight={
                          this.props.activity.is_free ? "Free" : "Paid"
                        }
                        highlightStyle={{
                          padding: "0px",
                          "background-color": "#fdff32"
                        }}
                      />
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p align="left">
                      <b>Activity Level:</b>
                    </p>
                  </Col>
                  <Col xs="auto">
                    <p align="right" className="capitalize">
                      {
                        <Highlighter
                          highlightClassName="search-highlight"
                          searchWords={[this.props.highlight]}
                          textToHighlight={
                            this.props.activity.is_active ? "Active" : "Casual"
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
                      <b>Location:</b>
                    </p>
                  </Col>
                  <Col xs="auto">
                    <p align="right">
                      {
                        <Highlighter
                          highlightClassName="search-highlight"
                          searchWords={[this.props.highlight]}
                          textToHighlight={this.props.activity.location}
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
                      <b>Type:</b>
                    </p>
                  </Col>
                  <Col xs="auto">
                    <p align="right" className="capitalize">
                      {
                        <Highlighter
                          highlightClassName="search-highlight"
                          searchWords={[this.props.highlight]}
                          textToHighlight={
                            this.props.activity.type.toLowerCase() ===
                            "eventbrite"
                              ? "Event"
                              : this.props.activity.type
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
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}

export default ActivityCard;
