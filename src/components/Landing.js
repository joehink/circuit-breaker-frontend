import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Circuit Breaker</h1>
          <Link to="/create">Create a Routine</Link>
        </div>
      </div>
    )
  }
}

export default Landing;
