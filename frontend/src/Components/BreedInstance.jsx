import React, { Component } from "react";

class BreedInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breedId: props.match.params.breedId
        };
    }
    render() {
        return <h1> breed Instance: {this.state.breedId}</h1>
    }
}
export default BreedInstance
