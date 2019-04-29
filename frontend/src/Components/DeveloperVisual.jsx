import React, { Component } from "react";
import { Tabs } from "@yazanaabed/react-tabs";
import BubbleChart from '@weknow/react-bubble-chart-d3';
import { BarChart } from 'react-d3-components';
import * as d3 from "d3";
import LoadingImage from "./LoadingImage.jsx";

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
    // TODO: Colors for bar graph (which I spent an hour on and couldn't get working :()
    // TODO: Separate out visualizations into different methods so that visualizations 2 and 3 can load before visualizations 1?
    let info = await wrapper.getWebsiteQuery(" ");

    // Visualization 1
    // let city_dog_pairings = new Map();
    // let shelter_cities = [];
    // let shelter_promises = [];
    // for (let shelter of info.shelters) {
    //   shelter_promises.push(wrapper.getShelterDogs(shelter.id));
    //   shelter_cities.push(shelter.city);
    // }
    //
    // // WARNING: 500 API calls. Is this too slow / a risk to my AWS billing?
    // let shelter_dogs = await Promise.all(shelter_promises);
    //
    // for (let i = 0; i < shelter_dogs.length; ++i) {
    //   let num_dogs = shelter_dogs[i].num_results;
    //   let city = shelter_cities[i];
    //
    //   if (city_dog_pairings.has(city)) {
    //     city_dog_pairings.set(city, city_dog_pairings.get(city) + num_dogs);
    //   }
    //   else city_dog_pairings.set(city, num_dogs);
    // }
    //
    // let city_dog_pairs = [];
    // for (let entry of city_dog_pairings.entries()) {
    //   // Readability purposes
    //   if (entry[1] > 4)
    //     city_dog_pairs.push({label: entry[0], value: entry[1]});
    // }

    // Alternate Visualization 1 (city_shelter pairings)
    let city_dog_pairings = new Map();
    for (let shelter of info.shelters) {
      let city = shelter.city;

      if (city_dog_pairings.has(city)) {
        city_dog_pairings.set(city, city_dog_pairings.get(city) + 1);
      }
      else city_dog_pairings.set(city, 1);
    }

    let city_dog_pairs = [];
    for (let entry of city_dog_pairings.entries()) {
      // Readability purposes
      if (entry[1] > 2)
        city_dog_pairs.push({label: entry[0], value: entry[1]});
    }

    // Visualization 2
    let group_breed_pairings = new Map();
    for (let breed of info.breeds) {
      let group = breed.group;
      // Breeds with null groups
      if (!group)
        continue;
      if (group_breed_pairings.has(group)) {
        group_breed_pairings.set(group, group_breed_pairings.get(group) + 1);
      }
      else group_breed_pairings.set(group, 1);
    }

    let group_breed_pairs = [];
    for (let entry of group_breed_pairings.entries()) {
      group_breed_pairs.push({x: entry[0], y: entry[1]});
    }

    let group_breed_data = [{
        label: "Frequency of Breeds by Group",
        values: group_breed_pairs
    }];

    // Visualization 3
    let dog_attribute_pairings = new Map();
    for (let dog of info.dogs) {
      let size_name = "";
      switch(dog.size) {
        case("S"):
          size_name = "Small";
          break;
        case("M"):
          size_name = "Medium";
          break;
        case("L"):
          size_name = "Large";
          break;
        case("XL"):
          size_name = "Extra Large";
          break;
        // Should never be reached
        default:
          console.log("Warning: Dog without size property has been encountered");
          size_name = "Extra Large";
          break;
      }
      let key = size_name + " and " + dog.age;

      if (dog_attribute_pairings.has(key)) {
        dog_attribute_pairings.set(key, dog_attribute_pairings.get(key) + 1);
      }
      else dog_attribute_pairings.set(key, 1);
    }

    let dog_attribute_pairs = [];
    for (let entry of dog_attribute_pairings.entries()) {
      dog_attribute_pairs.push({label: entry[0], value: entry[1]});
    }

    this.setState({
      info_loaded: true,
      information: info,
      city_dog_pairs: city_dog_pairs,
      group_breed_pairs: group_breed_data,
      dog_attribute_pairs: dog_attribute_pairs,
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
                <h2 className="mt-4 mb-2 ml-1 mr-1">Frequency of Shelters by City</h2>
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
                data={this.state.city_dog_pairs}
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
                <h2 className="mt-4 mb-2 ml-1 mr-1">Frequency of Breeds by Group</h2>
                <BarChart
                  data={this.state.group_breed_pairs}
                  xAxis={{label: "Group Name"}}
                  yAxis={{label: "Number of Breeds"}}
                  colorScale={d3.scaleOrdinal(d3.schemeAccent)}
                  width={this.state.width > 800 ? 800 : this.state.width}
                  height={this.state.width > 800 ? 800 : this.state.width}
                  margin={{top: 10, bottom: 50, left: 50, right: 10}}
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
                <h2 className="mt-4 mb-2 ml-1 mr-1">Frequency of Dogs by Size and Age</h2>
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
                data={this.state.dog_attribute_pairs}
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

export default DeveloperVisual;
