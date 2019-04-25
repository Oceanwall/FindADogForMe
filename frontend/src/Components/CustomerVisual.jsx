import React, { Component } from "react";
import { Tabs, TabProvider } from "@yazanaabed/react-tabs";
import { Route } from "react-router-dom";
import Datamap from "react-datamaps";
import "../styles/CustomerVisual.css";

const wrapper = require("../catastrophe_wrapper/wrapper.js").default;
// While the API is blocked by CORS, we use this instead...
const data = require("../catastrophe_wrapper/data.js").default;

class CustomerVisual extends Component {

  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false,
      width: 0,
      height: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {

  // Natural disaster frequency per state (map)
  // Organization frequency per state (map)
  // Natural disaster frequency per organization (bar graph)

    // Visualization 1

    // let state_data = await wrapper.get_states_models(undefined, undefined, undefined, undefined, undefined, undefined, 100, 1);
    // console.log(state_data);

    let state_data = data.state_data;
    let disaster_data = data.disaster_data;
    console.log(state_data);

    // Get state codes
    let state_disaster_pairings = {};
    for (let state of state_data) {
      state_disaster_pairings[state.code] = {disasters: 0};
    }

    // Get disaster frequency per state
    for (let disaster of disaster_data) {
      if (disaster.statecode) {
        state_disaster_pairings[disaster.statecode].disasters += 1;
      }
    }

    // Set fill keys based on disaster frequency
    for (const key of Object.keys(state_disaster_pairings)) {
      // 0-4, 5-9, 10-14, 15-19, 20-29, 30-39, 40-49, 50-59, 60-69, 70-79, 80-89
      let num = state_disaster_pairings[key].disasters;
      if (num <= 4)
        state_disaster_pairings[key]["fillKey"] = "0-4";
      else if (num <= 9)
        state_disaster_pairings[key]["fillKey"] = "5-9";
      else if (num <= 14)
        state_disaster_pairings[key]["fillKey"] = "10-14";
      else if (num <= 19)
        state_disaster_pairings[key]["fillKey"] = "15-19";
      else if (num <= 29)
        state_disaster_pairings[key]["fillKey"] = "20-29";
      else if (num <= 39)
        state_disaster_pairings[key]["fillKey"] = "30-39";
      else if (num <= 49)
        state_disaster_pairings[key]["fillKey"] = "40-49";
      else if (num <= 59)
        state_disaster_pairings[key]["fillKey"] = "50-59";
      else if (num <= 69)
        state_disaster_pairings[key]["fillKey"] = "60-69";
      else if (num <= 79)
        state_disaster_pairings[key]["fillKey"] = "70-79";
      else if (num <= 89)
        state_disaster_pairings[key]["fillKey"] = "80-89";
      else
        state_disaster_pairings[key]["fillKey"] = "defaultFill";
    }

    // Visualization 2

    // Visualization 3

    this.setState({
      info_loaded: true,
      state_disaster_pairings: state_disaster_pairings
    });

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    return (
      <div class="text-center mt-3">
        <Tabs
          activeTab={{
            id: "Visualization 1"
          }}
          ref={ref => {
            this.tabRef = ref;
          }}
        >
          <Tabs.Tab
            id="Visualization 1"
            title="Visualization 1"
          >
            {this.state.info_loaded ? (
              <div style={{width: (this.state.width > 1200 ? 1200 : this.state.width),
                           height: (this.state.width > 1200 ? 800 : (2 / 3) * this.state.width),
                           marginLeft: (this.state.width > 1200 ? (this.state.width - 1200) / 2 : 0),
                           marginTop: (this.state.width > 1200 ? "-80" : String(-0.1 * (2 / 3) * this.state.width) + "px")}}>
                <Datamap
        scope="usa"
        geographyConfig={{
          highlightBorderColor: 'black',
          popupTemplate: (geography, data) =>
            `<div class='hoverinfo'>${geography.properties.name}\n Number of Natural Disasters: ${data.disasters}`,
          highlightBorderWidth: 2
        }}
        fills={{
          '0-4': '#e5e9ff',
          '5-9': '#d8deff',
          '10-14': '#c6ceff',
          '15-19': '#b2bcff',
          '20-29': '#a5b1ff',
          '30-39': '#96a4ff',
          '40-49': '#7a8cff',
          '50-59': '#6076ff',
          '60-69': '#5168ff',
          '70-79': '#3d56ff',
          '80-89': '#182ba5',
          'defaultFill': '#12207a',
        }}
        data={this.state.state_disaster_pairings}
        labels
      />
              </div>
            ) : (
              <div>
                not loaded yet, plaese give me an animation
              </div>
            )}
          </Tabs.Tab>
          <Tabs.Tab
            id="Visualization 2"
            title="Visualization 2"
          >
            {this.state.info_loaded ? (
              <div>
                  i am loaded!
              </div>
            ) : (
              <div>
                not loaded yet, plaese give me an animation
              </div>
            )}
          </Tabs.Tab>
          <Tabs.Tab
            id="Visualization 3"
            title="Visualization 3"
          >
            {this.state.info_loaded ? (
              <div>
                i am loaded!
              </div>
            ) : (
              <div>
                not loaded yet, plaese give me an animation
              </div>
            )}
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default CustomerVisual;
