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
            <label htmlFor="">Duration (in seconds)</label>
            <input
              type="number"
              value={this.props.duration}
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
