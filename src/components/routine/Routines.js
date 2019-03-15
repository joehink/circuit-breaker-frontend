import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import { fetchRoutines } from "../../actions";

import requireAuth from "../requireAuth";

class Routines extends Component {
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.fetchRoutines(this.props.auth.authenticated);
    }
  }
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

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default compose(
  connect(mapStateToProps, { fetchRoutines }),
  requireAuth
)(Routines);
