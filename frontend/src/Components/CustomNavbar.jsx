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
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="/">
          <img src="../public/favicon.ico" />
          {"Find a Dog for Me"}
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/shelters">Shelters</Nav.Link>
          <Nav.Link href="/dogs">Dogs</Nav.Link>
          <Nav.Link href="/breeds">Breeds</Nav.Link>
          <Nav.Link href="/activities">Activities</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default CustomNavbar;
