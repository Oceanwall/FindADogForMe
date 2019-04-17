import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/CustomNavbar.css";
import GlobalSearch from "./GlobalSearch";

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.globalSearch = this.globalSearch.bind(this);
    this.searchParam = React.createRef();
  }

  globalSearch()  {
    if(this.searchParam.value != "")
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
            <Nav.Link href="/shelters">Shelters</Nav.Link>
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/breeds">Breeds</Nav.Link>
            <Nav.Link href="/activities">Activities</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
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
