import React, { Component } from "react";
import { Link } from "react-router-dom";

import requireAuth from "../requireAuth";

class Routines extends Component {
  render() {
    return (
      <div>
        Routines
        <Link to="/create">Create a Routine</Link>
        <Link to="/signout">Sign Out</Link>
      </div>
    )
  }
}

export default requireAuth(Routines);
