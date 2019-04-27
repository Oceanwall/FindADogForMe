import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/DataSourcesList.css";

class DataSourcesList extends Component {
  render() {
    return (
      <div class="ds-text">
        <ListGroup variant="flush">
          <h2 class="title-text data-text">Data Sources</h2>
          <ListGroup.Item>
            <a href="https://www.petfinder.com/developers/api-docs">
              Petfinder
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="https://thedogapi.com/">TheDogAPI</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="https://dog.ceo/dog-api/documentation/">DogAPI</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="https://www.eventbrite.com/platform/docs/introduction">
              Eventbrite
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="https://www.meetup.com/meetup_api/">Meetup</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="https://www.nps.gov/subjects/developer/api-documentation.htm">
              National Park Service
            </a>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          <div class="title-text data-text">GitLab URL</div>
          <ListGroup.Item>
            <a
              href="https://gitlab.com/oceanwall/findadogforme"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find A Dog For Me
            </a>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup variant="flush">
          <div class="title-text data-text">Postman API</div>
          <ListGroup.Item>
            <a
              href="https://documenter.getpostman.com/view/6754951/S11KQJxc"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default DataSourcesList;
