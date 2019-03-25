import React, { Component } from "react";
import "./styles/App.css";
import CustomNavbar from "./Components/CustomNavbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Shelters from "./Components/Shelters";
import Dogs from "./Components/Dogs";
import Breeds from "./Components/Breeds";
import Activities from "./Components/Activities";
import NoMatch from "./Components/Error404";


class App extends Component {
  render() {
    return (
      <div className="App">
        <CustomNavbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/shelters" component={Shelters} />
            <Route exact path="/dogs" component={Dogs} />
            <Route exact path="/breeds" component={Breeds} />
            <Route exact path="/activities" component={Activities} />
            <Route exact path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
