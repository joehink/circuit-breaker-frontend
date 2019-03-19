import React, { Component } from "react";
import { connect } from "react-redux";

import { signOut } from "../actions";

class SignOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }
  render() {
    return (
      <div style={{ display: "flex", flex: 1 }}>
        <div className="modal">
          <i class="fas fa-running"></i>
          <h1 style={{ marginTop: "15px" }}>Goodbye!</h1>
        </div>
      </div>
    )
  }
}

export default connect(null, { signOut })(SignOut);
