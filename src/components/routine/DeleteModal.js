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
          <i className="fas fa-question-circle"></i>
          <h3 style={{ marginBottom: 0}}>
            Are you sure you want to delete "{this.props.routine.name}"?
          </h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-button-group">
              <button
                type="button"
                onClick={this.props.hideDeleteModal}
                className="form-button"
              >
                Cancel
              </button>
              <input type="submit" className="form-button" value="Delete" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default DeleteModal;
