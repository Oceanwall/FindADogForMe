import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 class="mt-4">No results found! Try expanding your search.</h1>
        <img style={{"height": "200px", "width": "100px"}} src="/images/404dog.jpg" alt="Cartoon dog appearing to indicate the presence of no search results."></img>
      </div>
    );
  }
}

export default NotFound;
