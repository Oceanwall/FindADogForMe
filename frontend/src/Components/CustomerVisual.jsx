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

    // let state_data = await wrapper.get_states_models(undefined, undefined, undefined, undefined, undefined, undefined, 100, 1);
    // console.log(state_data);

    let state_data = data.state_data;
    console.log(state_data);

    this.setState({
      info_loaded: true,
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
          highlightBorderColor: '#bada55',
          popupTemplate: (geography, data) =>
            `<div class='hoverinfo'>${geography.properties.name}\nElectoral Votes: ${data.electoralVotes}`,
          highlightBorderWidth: 3
        }}
        fills={{
          'Republican': '#cc4731',
          'Democrat': '#306596',
          'Heavy Democrat': '#667faf',
          'Light Democrat': '#a9c0de',
          'Heavy Republican': '#ca5e5b',
          'Light Republican': '#eaa9a8',
          'defaultFill': '#eddc4e'
        }}
        data={{
          AZ: {
            fillKey: 'Republican',
            electoralVotes: 5
          },
          CO: {
            fillKey: 'Light Democrat',
            electoralVotes: 5
          },
          DE: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          FL: {
            fillKey: 'UNDECIDED',
            electoralVotes: 29
          },
          GA: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          HI: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          ID: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          IL: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          IN: {
            fillKey: 'Republican',
            electoralVotes: 11
          },
          IA: {
            fillKey: 'Light Democrat',
            electoralVotes: 11
          },
          KS: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          KY: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          LA: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          MD: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          ME: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          MA: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          MN: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          MI: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          MS: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          MO: {
            fillKey: 'Republican',
            electoralVotes: 13
          },
          MT: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          NC: {
            fillKey: 'Light Republican',
            electoralVotes: 32
          },
          NE: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          NV: {
            fillKey: 'Heavy Democrat',
            electoralVotes: 32
          },
          NH: {
            fillKey: 'Light Democrat',
            electoralVotes: 32
          },
          NJ: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          NY: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          ND: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          NM: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          OH: {
            fillKey: 'UNDECIDED',
            electoralVotes: 32
          },
          OK: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          OR: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          PA: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          RI: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          SC: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          SD: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          TN: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          TX: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          UT: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          WI: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          VA: {
            fillKey: 'Light Democrat',
            electoralVotes: 32
          },
          VT: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          WA: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          WV: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          WY: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          CA: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          CT: {
            fillKey: 'Democrat',
            electoralVotes: 32
          },
          AK: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          AR: {
            fillKey: 'Republican',
            electoralVotes: 32
          },
          AL: {
            fillKey: 'Republican',
            electoralVotes: 32
          }
        }}
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
