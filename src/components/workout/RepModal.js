import React, { Component } from "react";

class RepModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setReps();
  }
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <h3>How many reps?</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              value={this.props.reps}
              onChange={this.props.repsChange}
              className="form-input"
            />
            <input className="form-button" type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default RepModal;
