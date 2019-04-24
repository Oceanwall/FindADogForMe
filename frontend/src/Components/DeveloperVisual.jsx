import React, { Component } from "react";
import { Tabs, TabProvider } from "@yazanaabed/react-tabs";
import { Route } from "react-router-dom";
import BubbleChart from '@weknow/react-bubble-chart-d3';

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class DeveloperVisual extends Component {

  constructor(props) {
    super(props);
    //initialize initial state to not loaded
    this.state = {
      info_loaded: false,
      information: undefined,
      width: 0,
      height: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // Get all necessary information on mount
  async componentDidMount() {
    let info = await wrapper.getWebsiteQuery(" ");
    let pairings = new Map();

    // console.log(info);
    console.log(info.shelters);

    let shelter_cities = [];
    let shelter_promises = [];
    for (let shelter of info.shelters) {
      shelter_promises.push(wrapper.getShelterDogs(shelter.id));
      shelter_cities.push(shelter.city);
    }

    // 500 API calls. Should this be replaced by shelters per city?
    let shelter_dogs = await Promise.all(shelter_promises);

    for (let i = 0; i < shelter_dogs.length; ++i) {
      let num_dogs = shelter_dogs[i].num_results;
      let city = shelter_cities[i];

      if (pairings.has(city)) {
        pairings.set(city, pairings.get(city) + num_dogs);
      }
      else pairings.set(city, num_dogs);
    }

    let city_shelter_pairs = [];
    for (let entry of pairings.entries()) {
      // Readability purposes
      if (entry[1] > 4)
        city_shelter_pairs.push({label: entry[0], value: entry[1]});
    }

    this.setState({
      info_loaded: true,
      information: info,
      city_shelter_pairs: city_shelter_pairs,
    });

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
    console.log(window.innerWidth);
    console.log(window.innerHeight);
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
                <BubbleChart
                graph= {{
                  zoom: 1,
                  offsetX: 0,
                  offsetY: 0,
                }}
                width={this.state.width > 800 ? 800 : this.state.width}
                height={this.state.width > 800 ? 800 : this.state.width}
                showLegend={false} // optional value, pass false to disable the legend.
                valueFont={{
                      family: 'Arial',
                      size: 12,
                      color: '#fff',
                      weight: 'bold',
                    }}
                labelFont={{
                      family: 'Arial',
                      size: 10,
                      color: '#fff',
                      weight: 'bold',
                    }}
                data={this.state.city_shelter_pairs}
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
                loaded
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
                loaded
              </div>
            ) : (
              <div>
                not loaded yet
              </div>
            )}
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default DeveloperVisual;
