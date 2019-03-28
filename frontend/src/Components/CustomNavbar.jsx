import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class CustomNavbar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg" id="general-navbar">
        <Navbar.Brand href="/">
          <img src="/favicon.ico" alt="" />
          {"Find a Dog for Me"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shelters">Shelters</Nav.Link>
            <Nav.Link href="/dogs">Dogs</Nav.Link>
            <Nav.Link href="/breeds">Breeds</Nav.Link>
            <Nav.Link href="/activities">Activities</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Form inline className="justify-content-center col-xs-6">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary" className="mt-2 mt-sm-0">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default CustomNavbar;
