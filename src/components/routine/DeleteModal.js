import React, { Component } from "react";

class DeleteModal extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleDelete()
  }
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal">
          <h3>Are you sure you want to delete "{this.props.routine.name}"?</h3>
          <form onSubmit={this.handleSubmit}>
            <button
              type="button"
              onClick={this.props.hideDeleteModal}
              className="form-button"
            >
              Cancel
            </button>
            <input type="submit" className="form-button" value="Delete" />
          </form>
        </div>
      </div>
    )
  }
}

export default DeleteModal;
