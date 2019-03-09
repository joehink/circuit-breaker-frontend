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
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">Duration (in seconds)</label>
            <input
              type="number"
              value={this.props.duration}
              onChange={this.props.handleDurationChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default DurationModal;
