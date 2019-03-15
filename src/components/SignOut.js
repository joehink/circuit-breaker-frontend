import React, { Component } from "react";
import { connect } from "react-redux";

import { signOut } from "../actions";

class SignOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }
  render() {
    return (
      <div>Goodbye!</div>
    )
  }
}

export default connect(null, { signOut })(SignOut);
