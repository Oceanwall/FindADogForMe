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
import GlobalSearch from "./Components/GlobalSearch";
import DeveloperVisual from "./Components/DeveloperVisual"
import NoMatch from "./Components/Error404";


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Router>
          <CustomNavbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/shelters" component={Shelters} />
            <Route path="/dogs" component={Dogs} />
            <Route path="/breeds" component={Breeds} />
            <Route path="/activities" component={Activities} />
            <Route exact path="/about" component={About} />
            <Route path="/search/:id" component={GlobalSearch} />
            <Route path="/dev-visualizations" component={DeveloperVisual} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
