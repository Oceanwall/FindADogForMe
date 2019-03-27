import React, { Component } from "react";

class ActivityInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityId: props.match.params.activityId
        };
    }
    render() {
        return <h1> Activity Instance: {this.state.activityId}</h1>
    }
}
export default ActivityInstance
