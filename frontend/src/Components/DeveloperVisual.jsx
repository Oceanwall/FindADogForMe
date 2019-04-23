import React, { Component } from "react";
import { Tabs, TabProvider } from "@yazanaabed/react-tabs";
import { Route } from "react-router-dom";

const wrapper = require("../api_wrapper_functions/wrapper.js").default;

class DeveloperVisual extends Component {
  render() {
    return (
      <div class="text-center mt-3">
        <Tabs
          activeTab={{
            id: "tab1"
          }}
          ref={ref => {
            this.tabRef = ref;
          }}
        >
          <Tabs.Tab
            id="tab1"
            title="Tab 1"
          >
            <div />
          </Tabs.Tab>
          <Tabs.Tab
            id="tab2"
            title="Tab 2"
          >
            <div />
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  }
}

export default DeveloperVisual;