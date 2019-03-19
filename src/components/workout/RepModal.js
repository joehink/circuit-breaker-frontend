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
          <form onSubmit={this.handleSubmit}>
            <i className="fas fa-dumbbell"></i>
            <h3>How many reps?</h3>
            <input
              type="number"
              value={this.props.reps}
              min="1"
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
