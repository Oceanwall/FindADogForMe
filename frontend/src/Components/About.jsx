import React, { Component } from "react";
import MemberCard from "./MemberCard";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import LogoDeck from "./LogoDeck";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/About.css";

class About extends Component {
  state = {
    total_commits: 0,
    total_issues: 0,
    people_info: {
      bryanyang16: {
        name: "Bryan Yang",
        bio:
          "Sophomore computer science student at UT who likes sports, music, and good food",
        responsibility: "Front-end engineer",
        commits: 0,
        issues: 0,
        tests: 0,
        img: "/images/bryan.jpg"
      },
      samarthdesai01: {
        name: "Samarth Desai",
        bio:
          "Just another UTCS Sophomore really into junk food, video games, and getting his Writing Flag",
        responsibility: "Worked mainly on the backend portion of the project",
        commits: 0,
        issues: 0,
        tests: 0,
        img: "/images/samarth.jpg"
      },
      Triplestop: {
        name: "Daniel Ho",
        bio: "UTCS Senior, loves to travel and play video games",
        responsibility: "Front-end",
        commits: 0,
        issues: 0,
        tests: 0,
        img: "/images/daniel.png"
      },
      wc9245: {
        name: "Keven Chen",
        bio: "Another Asian sophomore UTCS major who likes to laze around...",
        responsibility: " I work on frontend stuff.",
        commits: 0,
        issues: 0,
        tests: 0,
        img: "/images/keven.jpg"
      },
      oceanwall: {
        name: "Matthew Zhao",
        bio:
          "Sophomore at UT CS (duh), likes basketball and violin, certified as the worst member of the UT Badminton Club.",
        responsibility:
          "Currently a Fullstack Engineer, primarily responsible for Backend.",
        commits: 0,
        issues: 0,
        tests: 20,
        img: "/images/matthew.jpg"
      }
    },
    BASE_URL: "https://gitlab.com/api/v4/projects/",
    USERNAME: "oceanwall",
    REPO_NAME: "findadogforme"
  };

  async load_commits() {
    let repo_response = await fetch(
      `${this.state.BASE_URL}${this.state.USERNAME}%2F${this.state.REPO_NAME}`
    );
    let repo_info = await repo_response.json();
    let page_number = 1;
    let commits_response = await fetch(
      `${this.state.BASE_URL}${
        repo_info.id
      }/repository/commits?per_page=100&page=` + page_number
    );
    let commit_info = await commits_response.json();

    let commits = 0;

    do {
      for (let commit of commit_info) {
        let name = commit.author_name;
        if (name === "Bryan Yang" || name === "bryanyang16") {
          let temp = this.state.people_info;
          temp["bryanyang16"].commits += 1;
          this.setState({ people_info: temp });
          commits++;
        } else if (name === "Keven Chen" || name === "wc9245") {
          let temp = this.state.people_info;
          temp["wc9245"].commits += 1;
          this.setState({ people_info: temp });
          commits++;
        } else if (name === "Matthew Zhao" || name === "oceanwall") {
          let temp = this.state.people_info;
          temp["oceanwall"].commits += 1;
          this.setState({ people_info: temp });
          commits++;
        } else if (name === "Samarth Desai" || name === "SamarthDesai01") {
          let temp = this.state.people_info;
          temp["samarthdesai01"].commits += 1;
          this.setState({ people_info: temp });
          commits++;
        } else if (name === "Daniel Ho" || name === "bryanyang16") {
          let temp = this.state.people_info;
          temp["Triplestop"].commits += 1;
          this.setState({ people_info: temp });
          commits++;
        } else {
          console.log("Unknown commit author: " + commit.author_name);
        }
      }

      ++page_number;
      commits_response = await fetch(
        `${this.state.BASE_URL}${
          repo_info.id
        }/repository/commits?per_page=100&page=` + page_number
      );
      commit_info = await commits_response.json();
    } while (commit_info.length > 0);
    this.setState({ total_commits: commits });
  }

  async load_issues() {
    let repo_response = await fetch(
      `${this.state.BASE_URL}${this.state.USERNAME}%2F${this.state.REPO_NAME}`
    );
    let repo_info = await repo_response.json();
    let page_number = 1;
    let issues_response = await fetch(
      `${this.state.BASE_URL}${repo_info.id}/issues?per_page=100&page=` +
        page_number
    );
    let issue_info = await issues_response.json();

    let total_issues = 0;

    do {
      for (let issue of issue_info) {
        let name = issue.author.username.toLowerCase();
        if (name === "bryanyang16") {
          let temp = this.state.people_info;
          temp[name].issues += 1;
          this.setState({ people_info: temp });
          total_issues++;
        } else if (name === "oceanwall") {
          let temp = this.state.people_info;
          temp[name].issues += 1;
          this.setState({ people_info: temp });
          total_issues++;
        } else if (name === "samarthdesai01") {
          let temp = this.state.people_info;
          temp[name].issues += 1;
          this.setState({ people_info: temp });
          total_issues++;
        } else if (name === "wc9245") {
          let temp = this.state.people_info;
          temp[name].issues += 1;
          this.setState({ people_info: temp });
          total_issues++;
        } else if (name === "Triplestop") {
          let temp = this.state.people_info;
          temp[name].issues += 1;
          this.setState({ people_info: temp });
          total_issues++;
        } else {
          console.log("Unknown issue author: " + issue.author.username);
        }
      }

      ++page_number;
      issues_response = await fetch(
        `${this.state.BASE_URL}${repo_info.id}/issues?per_page=100&page=` +
          page_number
      );
      issue_info = await issues_response.json();
    } while (issue_info.length > 0);

    this.setState({ total_issues: total_issues });
  }

  componentDidMount() {
    this.load_commits();
    this.load_issues();
  }

  render() {
    let memberCards = Object.values(this.state.people_info).map(person => {
      return (
        <div class="col-md-4 offset-md-0 col-10 offset-1">
          <MemberCard person={person} />
        </div>
      );
    });
    return (
      <div>
        <Container>
          <h2 class="text-center">Description and Motivation</h2>
          <p class="mt-3" align="left">
            As shelters become increasingly crowded at alarming rates, it's
            become clear that the adoption process must be optimized. Our intent
            is to go beyond simple data aggregation in facilitating the adoption
            of dogs from shelters.
          </p>
          <p align="left">
            We aim to provide a simple, yet powerful pet recommendation tool to
            match owners with specific breeds and dogs. By asking a user for
            their preferences, we narrow down their opinions and find their
            perfect match.
          </p>
          <p align="left">
            Moreover, to further encourage prospective adopters, we promote a
            wide range of activities that can be performed with their new furry
            companions, such as nearby state and national parks and events
            happening in nearby locations.
          </p>
        </Container>

        <h2 class="text-center mt-4">Members</h2>
        <Container>
          <CardDeck>
            <div class="card-deck">{memberCards}</div>
          </CardDeck>
        </Container>

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
              <td id="Total-Commits">{this.state.total_commits}</td>
              <td id="Total-Issues">{this.state.total_issues}</td>
              <td id="Total-UT">0</td>
            </tr>
          </tbody>
        </table>

        <h2 class="text-center mt-4">Tools</h2>
        <Container>
          <LogoDeck />
        </Container>
        <br />

        <Row>
          <Col>
            <h2 class="text-center">Data Sources</h2>
            <div class="text-center">
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
          </Col>
          <Col>
            <h2>
              GitLab URL: <br />
              <a
                href="https://gitlab.com/oceanwall/findadogforme"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find A Dog For Me
              </a>
            </h2>
            <br />
            <h2>
              Postman API URL:
              <br />
              <a
                href="https://documenter.getpostman.com/view/6754951/S11KQJxc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
            </h2>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
