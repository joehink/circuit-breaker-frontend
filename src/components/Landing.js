import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="modal">
          <h1>Circuit Breaker</h1>
          <Link
            className="form-button landing-button"
            to="/create"
          >
            Create a Routine
          </Link>
        </div>
      </div>
    )
  }
}

export default Landing;
