import React, { Component } from "react";

class ShelterInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelterId: props.match.params.shelterId
        };
    }
    render() {
        return <h1> Shelter Instance: {this.state.shelterId}</h1>
    }
}
export default ShelterInstance
