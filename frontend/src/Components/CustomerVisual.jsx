import React, { Component } from "react";
import { Tabs } from "@yazanaabed/react-tabs";
import Datamap from "react-datamaps";
import BubbleChart from '@weknow/react-bubble-chart-d3';
import "../styles/CustomerVisual.css";
import LoadingImage from "./LoadingImage";

const wrapper = require("../catastrophe_wrapper/wrapper.js").default;
// While the API is blocked by CORS, we use this instead...
const data = require("../catastrophe_wrapper/data.js").default;

class CustomerVisual extends Component {

  constructor(props) {
    super(props);
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
    // Disaster funding frequency (bubble)
    let state_data, disaster_data, organization_data;

    try {
      let data = [wrapper.get_states_models(undefined, undefined, undefined, undefined, undefined, undefined, 1, 1000),
                  wrapper.get_natural_disasters(undefined, undefined, undefined, undefined, 1, 1000),
                  wrapper.get_organizations(undefined, undefined, undefined, 1, 1000)
              ];

      let data_loaded = await Promise.all(data);

      state_data = data_loaded[0];
      disaster_data = data_loaded[1];
      organization_data = data_loaded[2];
    }
    catch {
      console.log("Loading catastrophe_world data through API failed, falling back to data file.");
      state_data = data.state_data;
      disaster_data = data.disaster_data;
      organization_data = data.organization_data;
    }

    // Visualization 1

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

    // Get state codes
    let state_organization_pairings = {};
    for (let state of state_data) {
      state_organization_pairings[state.code] = {organizations: 0};
    }

    // Get organization frequency per state
    for (let organization of organization_data) {
      if (organization.stateorprovince) {
        state_organization_pairings[organization.stateorprovince].organizations += 1;
      }
    }

    // Set fill keys based on organization frequency
    for (const key of Object.keys(state_organization_pairings)) {
      // 0, 1, 2, 3, 4, 5, 6
      let num = state_organization_pairings[key].organizations;
      if (num <= 6)
        state_organization_pairings[key]["fillKey"] = String(num);
      else
        state_organization_pairings[key]["fillKey"] = "defaultFill";
    }

    // Visualization 3
    let disaster_funding_pairings = {"$0 Funding": 0,
                                     "$1 - $10,000 Funding": 0,
                                     "$10,001 - $20,000 Funding": 0,
                                     "$20,001 - $50,000 Funding": 0,
                                     "$50,001 - $100,000 Funding": 0,
                                     "$100,001 - $200,000 Funding": 0,
                                     "$200,001 - $500,000 Funding": 0,
                                     "$500,001 - $1,000,000 Funding": 0,
                                     "$1,000,001 - $2,000,000 Funding": 0,
                                     "$2,000,001 - $5,000,000 Funding": 0,
                                     "$5,000,001 - $10,000,000 Funding": 0,
                                     "$10,000,001 - $20,000,000 Funding": 0,
                                     "$20,000,001 - $50,000,000 Funding": 0,
                                     "$50,000,001 - $100,000,000 Funding": 0,
                                     "$100,000,001 - $200,000,000 Funding": 0,
                                     "$200,000,001 - $500,000,000 Funding": 0,
                                     "$500,000,001 - $1,000,000,000 Funding": 0,
                                     "$1,000,000,001+ Funding": 0,
                                   };
    // Map funding level of each disaster to appropriate tier.
    for (let disaster of disaster_data) {
      if (disaster.obligatedfunding === 0)
        disaster_funding_pairings["$0 Funding"] += 1;
      else if (disaster.obligatedfunding <= 10000)
        disaster_funding_pairings["$1 - $10,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 20000)
        disaster_funding_pairings["$10,001 - $20,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 50000)
        disaster_funding_pairings["$20,001 - $50,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 100000)
        disaster_funding_pairings["$50,001 - $100,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 200000)
        disaster_funding_pairings["$100,001 - $200,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 500000)
        disaster_funding_pairings["$200,001 - $500,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 1000000)
        disaster_funding_pairings["$500,001 - $1,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 2000000)
        disaster_funding_pairings["$1,000,001 - $2,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 5000000)
        disaster_funding_pairings["$2,000,001 - $5,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 10000000)
        disaster_funding_pairings["$5,000,001 - $10,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 20000000)
        disaster_funding_pairings["$10,000,001 - $20,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 50000000)
        disaster_funding_pairings["$20,000,001 - $50,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 100000000)
        disaster_funding_pairings["$50,000,001 - $100,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 200000000)
        disaster_funding_pairings["$100,000,001 - $200,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 500000000)
        disaster_funding_pairings["$200,000,001 - $500,000,000 Funding"] += 1;
      else if (disaster.obligatedfunding <= 1000000000)
        disaster_funding_pairings["$500,000,001 - $1,000,000,000 Funding"] += 1;
      else
        disaster_funding_pairings["$1,000,000,001+ Funding"] += 1;
    }

    let disaster_fund_pairs = [];
    for (const key of Object.keys(disaster_funding_pairings)) {
      disaster_fund_pairs.push({label: key, value: disaster_funding_pairings[key]});
    }

    this.setState({
      info_loaded: true,
      state_disaster_pairings: state_disaster_pairings,
      state_organization_pairings: state_organization_pairings,
      disaster_fund_pairs: disaster_fund_pairs
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
              <div>
                <h2 className="mt-4 ml-1 mr-1">Frequency of Natural Disasters by State</h2>
                <Datamap
                  width={this.state.width > 1200 ? 1200 : this.state.width}
                  height={this.state.width > 1200 ? 800 : (2 / 3) * this.state.width}
                  style={{marginTop: (this.state.width > 1200 ? "-80px" : String(-0.1 * 2/3 * this.state.width) + "px")}}
                  scope="usa"
                  geographyConfig={{
                    highlightBorderColor: 'black',
                    popupTemplate: (geography, data) =>
                      `<div class='hoverinfo'><strong>${geography.properties.name}</strong>\n Number of Natural Disasters: ${data.disasters}`,
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
                <LoadingImage></LoadingImage>
              </div>
            )}
          </Tabs.Tab>
          <Tabs.Tab
            id="Visualization 2"
            title="Visualization 2"
          >
            {this.state.info_loaded ? (
              <div>
                <h2 className="mt-4 ml-1 mr-1">Frequency of Organizations by State</h2>
                <Datamap
                  width={this.state.width > 1200 ? 1200 : this.state.width}
                  height={this.state.width > 1200 ? 800 : (2 / 3) * this.state.width}
                  style={{marginTop: (this.state.width > 1200 ? "-80px" : String(-0.1 * 2/3 * this.state.width) + "px")}}
                  scope="usa"
                  geographyConfig={{
                    highlightBorderColor: 'black',
                    popupTemplate: (geography, data) =>
                      `<div class='hoverinfo'><strong>${geography.properties.name}</strong>\n Number of Organizations Present: ${data.organizations}`,
                    highlightFillColor: "#bda8e0",
                    highlightBorderWidth: 2
                  }}
                  fills={{
                    '0': '#ffefd3',
                    '1': '#ffe3b2',
                    '2': '#ffd387',
                    '3': '#ffc86b',
                    '4': '#ffbc4c',
                    '5': '#ffad26',
                    '6': '#ffa511',
                    'defaultFill': '#ff9e00',
                  }}
                  data={this.state.state_organization_pairings}
                  labels
                />
              </div>
            ) : (
              <div>
                <LoadingImage></LoadingImage>
              </div>
            )}
          </Tabs.Tab>
          <Tabs.Tab
            id="Visualization 3"
            title="Visualization 3"
          >
            {this.state.info_loaded ? (
              <div>
                <h2 className="mt-4 ml-1 mr-1">Frequency of Natural Disasters by Funding</h2>
                <BubbleChart
                  graph= {{
                    zoom: 1,
                    offsetX: 0,
                    offsetY: 0,
                  }}
                  width={this.state.width > 800 ? 800 : this.state.width}
                  height={this.state.width > 800 ? 800 : this.state.width}
                  showLegend={false}
                  valueFont={{
                        family: 'Arial',
                        size: 14,
                        color: '#fff',
                        weight: 'bold',
                      }}
                  labelFont={{
                        family: 'Arial',
                        size: 12,
                        color: '#fff',
                      }}
                  data={this.state.disaster_fund_pairs}
                />
              </div>
            ) : (
              <div>
                <LoadingImage></LoadingImage>
              </div>
            )}
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default CustomerVisual;
