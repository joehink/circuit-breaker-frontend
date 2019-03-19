import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompletedModal extends Component {
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <div className="form-button-group">
            <Link className="form-button" to="/" onClick={this.props.clearWorkout}>
              Done
            </Link>
            <button className="form-button" onClick={this.props.resetCurrentWorkout}>
              Go Again
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CompletedModal;
