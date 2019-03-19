import React, { Component } from "react";

class DurationModal extends Component {
  handleSubmit = (event) => {
    // prevent form from refreshing page
    event.preventDefault();
    // set duration of selected exercise
    this.props.setDuration()
  }
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <form onSubmit={this.handleSubmit}>
            <i className="fas fa-clock"></i>
            <h3>Duration (in seconds)</h3>
            <input
              type="number"
              value={this.props.duration}
              min="1"
              onChange={this.props.handleDurationChange}
              className="form-input"
            />
            <input className="form-button" type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default DurationModal;
