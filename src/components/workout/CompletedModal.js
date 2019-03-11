import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompletedModal extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/" onClick={this.props.clearWorkout}>
            Done
          </Link>
          <button onClick={this.props.resetCurrentWorkout}>
            Go Again
          </button>
        </div>
      </div>
    )
  }
}

export default CompletedModal;
