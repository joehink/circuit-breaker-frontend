import React, { Component } from "react";

class RepModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setReps();
  }
  render() {
    return (
      <div>
        <div>
          <h3>How many reps?</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              value={this.props.reps}
              onChange={this.props.repsChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default RepModal;
