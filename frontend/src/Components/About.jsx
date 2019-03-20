import React, { Component } from "react";
import MemberCard from "./MemberCard";
import CardDeck from "react-bootstrap/CardDeck";
import Bryan from "./../images/bryan.jpg";
import Daniel from "./../images/daniel.png";
import Samarth from "./../images/samarth.jpg";
import Matthew from "./../images/matthew.jpg";
import Keven from "./../images/keven.jpg";

class About extends Component {
  state = {
    people: [
      {
        name: "Bryan Yang",
        bio:
          "Sophomore computer science student at UT who likes sports, music, and good food",
        responsibility: "Front-end engineer",
        commits: 0,
        issues: 0,
        tests: 0,
        img: Bryan
      },
      {
        name: "Samarth Desai",
        bio:
          "Just another UTCS Sophomore really into junk food, video games, and getting his Writing Flag",
        responsibility: "Worked mainly on the backend portion of the project",
        commits: 0,
        issues: 0,
        tests: 0,
        img: Samarth
      },
      {
        name: "Daniel Ho",
        bio: "UTCS Senior, loves to travel and play video games",
        responsibility: "Front-end",
        commits: 0,
        issues: 0,
        tests: 0,
        img: Daniel
      },
      {
        name: "Keven Chen",
        bio: "Another Asian sophomore UTCS major who likes to laze around...",
        responsibility: " I work on frontend stuff.",
        commits: 0,
        issues: 0,
        tests: 0,
        img: Keven
      },
      {
        name: "Matthew Zhao",
        bio:
          "Sophomore at UT CS (duh), likes basketball and violin, certified as the worst member of the UT Badminton Club.",
        responsibility:
          "Currently a Fullstack Engineer, primarily responsible for Backend.",
        commits: 0,
        issues: 0,
        tests: 0,
        img: Matthew
      }
    ]
  };
  render() {
    let memberCards = this.state.people.map(person => {
      return (
        <div class="col-md-4 offset-md-0 col-10 offset-1">
          <MemberCard person={person} />
        </div>
      );
    });
    return (
      <div>
        <div class="row mt-4">
          <div class="col-md-4 offset-md-1 col-10 offset-1">
            <h2 class="text-center">Description and Motivation</h2>
            <p class="mt-3">
              As shelters become increasingly crowded at alarming rates, it's
              become clear that the adoption process must be optimized. Our
              intent is to go beyond simple data aggregation in facilitating the
              adoption of dogs from shelters.
            </p>
            <p>
              We aim to provide a simple, yet powerful pet recommendation tool
              to match owners with specific breeds and dogs. By asking a user
              for their preferences, we narrow down their opinions and find
              their perfect match.
            </p>
            <p>
              Moreover, to further encourage prospective adopters, we promote a
              wide range of activities that can be performed with their new
              furry companions, such as nearby state and national parks and
              events happening in nearby locations.
            </p>
          </div>
          <div class="col-md-4 offset-md-2 col-10 offset-1">
            <h2 class="text-center">Data Sources</h2>
            <div class="text-center mt-5">
              <a href="https://www.petfinder.com/developers/api-docs">
                Petfinder
              </a>
            </div>
            <div class="text-center mt-2">
              <a href="https://thedogapi.com/">TheDogAPI</a>
            </div>
            <div class="text-center mt-2">
              <a href="https://dog.ceo/dog-api/documentation/">Dog API</a>
            </div>
            <div class="text-center mt-2">
              <a href="https://www.eventbrite.com/platform/docs/introduction">
                Eventbrite
              </a>
            </div>
            <div class="text-center mt-2">
              <a href="https://www.meetup.com/meetup_api/">Meetup</a>
            </div>
            <div class="text-center mt-2">
              <a href="https://www.nps.gov/subjects/developer/api-documentation.htm">
                National Park Service
              </a>
            </div>
          </div>
        </div>
        <h2 class="text-center mt-4">Stats</h2>
        <CardDeck>{memberCards}</CardDeck>

        <table class="table table-striped mt-5">
          <thead>
            <tr class="text-center">
              <th scope="col">Total # of Commits</th>
              <th scope="col">Total # of Issues</th>
              <th scope="col">Total # of Unit Tests</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td id="Total-Commits">0</td>
              <td id="Total-Issues">0</td>
              <td id="Total-UT">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default About;
