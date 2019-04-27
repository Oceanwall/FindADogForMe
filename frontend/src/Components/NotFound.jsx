import React, { Component } from "react";
import LoadingImage from "./LoadingImage";
class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 class="mt-4">No results found! Try narrowing your search.</h1>
        <img style={{"height": "200px", "width": "100px"}} src="/images/404dog.jpg"></img>
      </div>
    );
  }
}

export default NotFound;
