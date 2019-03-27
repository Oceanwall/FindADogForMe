import React, { Component } from "react";

class DogInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogId: props.match.params.dogId
        };
    }
    render() {
        return <h1> Dog Instance: {this.state.dogId}</h1>
    }
}
export default DogInstance
