import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/CustomNavbar.css";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer"

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.globalSearch = this.globalSearch.bind(this);
    this.searchParam = React.createRef();
  }

  globalSearch()  {
    if(this.searchParam.value !== "")
      this.props.history.push(`/search/${this.searchParam.value}`);
  }

  render() {
    return (
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        id="general-navbar"
        className="border-dark navbar"
      >
        <Navbar.Brand href="/">
          <img className="mr-2" src="/favicon.ico" alt="" />
          {"Find a Dog for Me"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/shelters">
              <Nav.Link>Shelters</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dogs">
              <Nav.Link>Dogs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/breeds">
              <Nav.Link>Breeds</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/activities">
              <Nav.Link>Activities</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dev-visualizations">
              <Nav.Link>Our Visuals</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer-visualizations">
              <Nav.Link>Provider Visuals</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {
          <Nav className="justify-content-end">
              <Form.Control
                id="searchbar"
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                ref={ref => {
                  this.searchParam = ref;
                }}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.globalSearch();
                  }
                }}
              />
              <Button variant="outline-primary" className="mt-2 mt-sm-0" onClick={()=>this.globalSearch()}>Search</Button>
          </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(CustomNavbar);
