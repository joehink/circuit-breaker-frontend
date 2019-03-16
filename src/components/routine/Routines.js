import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import { fetchRoutines, deleteRoutine, setEditRoutine } from "../../actions";

import requireAuth from "../requireAuth";

import DeleteModal from "./DeleteModal";

class Routines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      routineToDelete: null
    }
  }
  renderRoutines = () => {
    return this.props.routines.map(routine => {
      return (
        <div key={routine._id}>
          { routine.name }
          <button onClick={() => this.setRoutineToDelete(routine)}>
            Delete
          </button>
          <button onClick={() => this.handleEdit(routine)}>
            Edit
          </button>
        </div>
      )
    })
  }
  renderDeleteModal = () => {
    if (this.state.showDeleteModal) {
      return (
        <DeleteModal
          routine={this.state.routineToDelete}
          hideDeleteModal={this.hideDeleteModal}
          handleDelete={this.handleDelete}
        />
      )
    }
  }
  handleDelete = () => {
    this.props.deleteRoutine(this.state.routineToDelete._id, this.props.auth.authenticated);
    this.setState({ routineToDelete: null, showDeleteModal: false })
  }
  hideDeleteModal = () => {
    this.setState({ routineToDelete: null, showDeleteModal: false })
  }
  setRoutineToDelete = (routine) => {
    this.setState({ routineToDelete: routine, showDeleteModal: true })
  }
  handleEdit = (routine) => {
    this.props.setEditRoutine(routine);
    this.props.history.push('/edit')
  }
  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.fetchRoutines(this.props.auth.authenticated);
    }
  }
  render() {
    return (
      <div>
        Routines
        <Link to="/create">Create a Routine</Link>
        <div>
          { this.renderRoutines() }
        </div>
        { this.renderDeleteModal() }
      </div>
    )
  }
}

const mapStateToProps = ({ auth, routines }) => {
  return { auth, routines }
}

export default compose(
  connect(mapStateToProps, { fetchRoutines, deleteRoutine, setEditRoutine }),
  requireAuth
)(Routines);
