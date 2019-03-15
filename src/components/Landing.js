import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/create">Create a Routine</Link>
      </div>
    )
  }
}

export default Landing;
