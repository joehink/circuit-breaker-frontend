import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <button>Sign Up</button>
        <Link to="/create">Create a Routine</Link>
      </div>
    )
  }
}

export default Landing;
