import React, { Component } from "react";

class DeleteModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleDelete()
  }
  render() {
    return (
      <div>
        <div>
          <h3>Are you sure you want to delete "{this.props.routine.name}"?</h3>
          <form onSubmit={this.handleSubmit}>
            <button
              type="button"
              onClick={this.props.hideDeleteModal}
            >
              Cancel
            </button>
            <input type="submit" value="Delete" />
          </form>
        </div>
      </div>
    )
  }
}

export default DeleteModal;
