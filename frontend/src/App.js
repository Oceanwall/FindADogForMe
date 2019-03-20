import React, { Component } from "react";
import "./App.css";
import CustomNavbar from "./Components/CustomNavbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Shelters from "./Components/Shelters";
import Dogs from "./Components/Dogs";
import Breeds from "./Components/Breeds";
import Activities from "./Components/Activities";
import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <CustomNavbar />
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/shelters" component={Shelters} />
            <Route exact path="/dogs" component={Dogs} />
            <Route exact path="/breeds" component={Breeds} />
            <Route exact path="/activities" component={Activities} />
            <Route path="/about" component={About} />
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
